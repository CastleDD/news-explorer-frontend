import React from "react";
import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__photo"></div>
      <div className="about__message">
        <h2 className="about__title">About the author</h2>
        <p className="about__me">
          Hi there! My name is David Castellano, I'm the web developer who built
          this clean, responsive, and user-friendly application. I primarily
          work with JavaScript, React, HTML, and CSS.
        </p>
        <p className="about__more">
          Through TripleTen, I strengthened my front, and back-end development
          skills, learned best practices for building scalable projects, and
          gained experience working with real APIs. I'm passionate about turning
          ideas into functional products and creating solutions that help users.
        </p>
      </div>
    </section>
  );
}
export default About;
