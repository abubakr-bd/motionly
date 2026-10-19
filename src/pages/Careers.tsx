import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import SEO from "../components/layout/SEO";

const APPLY_URL = "https://app.youform.com/forms/zrg6xump";
const departments = ["All", "Graphics Design", "Script Writing", "Video Editing"];
const experienceLevels = ["All", "Beginner", "Mid", "Senior"];

const responsibilities = [
  "Edit short-form and long-form videos for different platforms.",
  "Turn raw footage into polished, engaging content.",
  "Create motion graphics, text animation, and sound design.",
  "Work with the creative team to bring ideas to life.",
];

const requirements = [
  "Comfort working in Premiere Pro and After Effects.",
  "A good understanding of pacing, storytelling, and sound.",
  "Care for detail and consistency across each edit.",
  "Openness to feedback and the ability to meet deadlines.",
];

const Careers: React.FC = () => {
  const [department, setDepartment] = useState("Video Editing");
  const [experience, setExperience] = useState("All");
  const roleVisible = (department === "All" || department === "Video Editing")
    && (experience === "All" || experience === "Beginner" || experience === "Mid");

    const careersSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://motionly.media/" },
            { "@type": "ListItem", position: 2, name: "Careers", item: "https://motionly.media/careers" },
          ],
        },
        {
          "@type": "WebPage",
          name: "Careers at Motionly Media",
          description: "Explore open video editing, motion design, and creative roles at Motionly Media.",
          url: "https://motionly.media/careers",
        }
      ]
    };

    return (
    <Layout>
      <SEO
        title="Careers at Motionly Media | Video Editing & Creative Roles"
        description="Join the Motionly Media team. We are hiring passionate video editors, motion graphic designers, and content strategists. Apply in minutes."
        url="https://motionly.media/careers"
        schema={careersSchema}
      />

      <section className="site-page-hero site-careers-hero">
        <div className="site-container">
          <div className="site-page-hero__copy site-page-hero__copy--wide">
            <p className="site-kicker">Careers at Motionly Media</p>
            <h1>Careers at Motionly Media | Join Our Creative Team</h1>
            <p className="site-page-hero__lede">
              Make thoughtful work with a close-knit team. We are looking for curious editors, motion designers, and strategists who care about the details and the story behind every cut.
            </p>
          </div>

          <div className="site-career-filters" aria-label="Filter open roles">
            <fieldset>
              <legend>Department</legend>
              <div>
                {departments.map((item) => (
                  <button key={item} type="button" aria-pressed={department === item} onClick={() => setDepartment(item)}>{item}</button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Experience</legend>
              <div>
                {experienceLevels.map((item) => (
                  <button key={item} type="button" aria-pressed={experience === item} onClick={() => setExperience(item)}>{item}</button>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </section>

      <section className="site-page-section site-careers-listing">
        <div className="site-container">
          {roleVisible ? (
            <article className="site-career-card">
              <div className="site-career-card__header">
                <div>
                  <p className="site-kicker">Video editing</p>
                  <h2>Video Editor</h2>
                  <p>Remote | Full time or internship</p>
                </div>
                <a className="site-button" href={APPLY_URL} target="_blank" rel="noopener noreferrer">Apply for this role</a>
              </div>

              <div className="site-career-card__body">
                <section>
                  <h3>About the role</h3>
                  <p>If you notice the pacing, awkward cuts, or a sound mix that feels off while watching a video, this role may suit you. You will help turn raw footage into work people want to finish watching.</p>
                  <ul>{responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section>
                  <h3>What we are looking for</h3>
                  <ul>{requirements.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              </div>

              <div className="site-career-card__footer">
                <p>Have a portfolio ready? The application takes about two minutes.</p>
                <a className="site-text-link" href={APPLY_URL} target="_blank" rel="noopener noreferrer">Submit an application</a>
              </div>
            </article>
          ) : (
            <div className="site-career-empty">
              <h2>No role matches these filters.</h2>
              <p>We currently have one opening in video editing for beginner and mid-level candidates.</p>
              <button type="button" className="site-button-secondary" onClick={() => { setDepartment("Video Editing"); setExperience("All"); }}>Show video editor role</button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
