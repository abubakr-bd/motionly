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

export function doc(...args: any[]) {
  if (args.length === 1) {
    const arg = args[0];
    if (typeof arg === "string") {
      if (arg.includes('/')) {
        const parts = arg.split('/');
        return { col: parts[0], id: parts[1] };
      }
      return { col: arg, id: crypto.randomUUID() };
    }
    if (arg && typeof arg === "object") {
      const col = arg.col || arg;
      return { col: typeof col === "string" ? col : String(col), id: crypto.randomUUID() };
    }
    return { col: String(arg), id: crypto.randomUUID() };
  }

  if (args.length === 2) {
    const [first, second] = args;
    if (typeof second === "string" && second.includes('/')) {
      const parts = second.split('/');
      return { col: parts[0], id: parts[1] };
    }
    if (typeof first === "string" && first.includes('/')) {
      const parts = first.split('/');
      return { col: parts[0], id: parts[1] };
    }
    const col = typeof first === "string" && first !== "d1" ? first : (first?.col || second);
    const id = first === col ? second : (second || crypto.randomUUID());
    return { col: String(col), id: String(id) };
  }

  // args.length >= 3: doc(db, col, id)
  const col = args[1];
  const id = args[2] || crypto.randomUUID();
  return { col: String(col), id: String(id) };
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
  const fetchAndCall = () => {
    const isDoc = Boolean(refOrQuery && typeof refOrQuery === "object" && typeof refOrQuery.id === "string" && refOrQuery.id.length > 0);
    if (isDoc) {
      getDoc(refOrQuery).then(onNext).catch(onError);
    } else {
      getDocs(refOrQuery).then(onNext).catch(onError);
    }
  };
  
  const isAdmin = typeof window !== "undefined" && (window.location.pathname.startsWith("/admin") || window.location.pathname.startsWith("/team"));
  if (isAdmin) {
    fetchAndCall();
  } else {
    setTimeout(fetchAndCall, 0);
  }
  
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
