// d1Shim.ts - Drop-in replacement for firebase/firestore to route requests to Cloudflare D1 API

let firebaseAuthToken = "";

// Helper to get auth token if needed for API requests
export function setFirebaseAuthToken(token: string) {
  firebaseAuthToken = token;
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };
  if (firebaseAuthToken) {
    headers["Authorization"] = `Bearer ${firebaseAuthToken}`;
  }
  
  const res = await fetch(path, { ...options, headers });
  if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
  return res.json();
}

export function getFirestore() { return "d1"; }

export function doc(db: any, col: string, id?: string) {
  if (arguments.length === 2 && col.includes('/')) {
    const parts = col.split('/');
    return { col: parts[0], id: parts[1] };
  }
  return { col, id };
}

export function collection(db: any, col: string) {
  return col;
}

export async function getDoc(ref: any) {
  try {
    const data = await apiFetch(`/api/fs/${ref.col}/${ref.id}`);
    return {
      exists: () => !!data && Object.keys(data).length > 0,
      data: () => data,
      id: ref.id
    };
  } catch {
    return { exists: () => false, data: () => null, id: ref.id };
  }
}

export async function getDocs(queryObj: any) {
  const col = typeof queryObj === "string" ? queryObj : queryObj.col;
  try {
    let items = await apiFetch(`/api/fs/${col}`);
    
    // Client-side sorting/filtering for simplicity
    if (queryObj.args) {
      for (const arg of queryObj.args) {
        if (arg.type === 'orderBy') {
          items.sort((a: any, b: any) => {
            const valA = a[arg.field] ?? 0;
            const valB = b[arg.field] ?? 0;
            if (valA < valB) return arg.dir === 'asc' ? -1 : 1;
            if (valA > valB) return arg.dir === 'asc' ? 1 : -1;
            return 0;
          });
        }
        if (arg.type === 'where') {
          items = items.filter((item: any) => {
            if (arg.op === '==') return item[arg.field] === arg.val;
            return true;
          });
        }
        if (arg.type === 'limit') {
          items = items.slice(0, arg.n);
        }
      }
    }

    return {
      empty: items.length === 0,
      docs: items.map((data: any) => ({
        id: data.id || data._id, // Ensure ID is present
        data: () => data,
        exists: () => true
      }))
    };
  } catch {
    return { empty: true, docs: [] };
  }
}

export async function setDoc(ref: any, data: any, options?: any) {
  await apiFetch(`/api/fs/${ref.col}/${ref.id}`, {
    method: 'POST',
    body: JSON.stringify({ data, merge: options?.merge })
  });
}

export async function updateDoc(ref: any, data: any) {
  await apiFetch(`/api/fs/${ref.col}/${ref.id}`, {
    method: 'POST',
    body: JSON.stringify({ data, merge: true })
  });
}

export async function deleteDoc(ref: any) {
  await apiFetch(`/api/fs/${ref.col}/${ref.id}`, { method: 'DELETE' });
}

export function onSnapshot(refOrQuery: any, onNext: any, onError?: any) {
  // We remove the 5-second polling interval to prevent hitting Cloudflare's 100k daily function limit.
  // The Admin panel will now just fetch data on mount. (Users can refresh the page to see new data).
  const fetchAndCall = () => {
    if (typeof refOrQuery === "string" || refOrQuery.col) {
      getDocs(refOrQuery).then(onNext).catch(onError);
    } else {
      getDoc(refOrQuery).then(onNext).catch(onError);
    }
  };
  
  fetchAndCall();
  
  // Return an empty unsubscribe function
  return () => {};
}

export function query(col: any, ...args: any[]) {
  return { col, args };
}

export function orderBy(field: string, dir: string = "asc") {
  return { type: 'orderBy', field, dir };
}

export function limit(n: number) {
  return { type: 'limit', n };
}

export function where(field: string, op: string, val: any) {
  return { type: 'where', field, op, val };
}

export const Timestamp = {
  now: () => ({ toMillis: () => Date.now(), seconds: Math.floor(Date.now() / 1000) }),
  fromDate: (d: Date) => ({ toMillis: () => d.getTime(), seconds: Math.floor(d.getTime() / 1000) })
};

export async function addDoc(colRef: any, data: any) {
  const id = crypto.randomUUID();
  const ref = { col: typeof colRef === "string" ? colRef : (colRef.col || colRef), id };
  await setDoc(ref, data);
  return { id };
}
