/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Catalin Ardelean Pop",
  title: "Hi all, I'm Catalin",
  subTitle: emoji(
    "I am a recent Computer Science graduate from Università di Roma Tor Vergata 🎓 with experience as a Junior Developer."
  ),
  resumeLink:
    "https://drive.google.com/uc?export=download&id=1cCqYGppGCc0OsgM76bFFqhc1GJV2ENY9",
  displayGreeting: true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/catalinpop92",
  linkedin: "https://www.linkedin.com/in/catalinpop7/",
  gmail: "catalin.pop927@gmail.com",
  //gitlab: "",
  //facebook: "",
  //medium: "",
  //stackoverflow: "",
  display: true // Set true to display this section, defaults to false
};


// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "Junior Developer with academic and professional experience",
  skills: [
    emoji("⚡ Software development with Java, JavaScript, C, Python, and SQL"),
    emoji("⚡ Web development using HTML, CSS, and web programming"),
    emoji("⚡ Backend development with Node.js and database management with MySQL"),
    emoji("⚡ Team collaboration in Agile environments and complete software lifecycle participation"),
    emoji("⚡ Office Automation and project management tools"),
    emoji("⚡ System administration and network architecture knowledge")
  ],

  /* Include all technologies mentioned in the CV */
  softwareSkills: [
    { skillName: "Java", fontAwesomeClassname: "fas fa-coffee" },
    { skillName: "JavaScript", fontAwesomeClassname: "fab fa-js" },
    { skillName: "C", fontAwesomeClassname: "fas fa-code" },
    { skillName: "SQL", fontAwesomeClassname: "fas fa-database" },
    { skillName: "HTML5", fontAwesomeClassname: "fab fa-html5" },
    { skillName: "CSS3", fontAwesomeClassname: "fab fa-css3-alt" },
    { skillName: "Node.js", fontAwesomeClassname: "fab fa-node" },
    { skillName: "Python", fontAwesomeClassname: "fab fa-python" },
    { skillName: "MySQL", fontAwesomeClassname: "fas fa-database" },
    { skillName: "MongoDB", fontAwesomeClassname: "fas fa-database" },
    { skillName: "Express.js", fontAwesomeClassname: "fas fa-server" },
    { skillName: "Git", fontAwesomeClassname: "fab fa-git" },
    { skillName: "VSCode", fontAwesomeClassname: "fas fa-laptop-code" },
    { skillName: "Eclipse", fontAwesomeClassname: "fas fa-laptop-code" },
    { skillName: "Postman", fontAwesomeClassname: "fas fa-vial" },
    { skillName: "Figma", fontAwesomeClassname: "fas fa-pencil-ruler" },
    { skillName: "Camunda", fontAwesomeClassname: "fas fa-cogs" },
  ],
  display: true
};


// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "University of Rome Tor Vergata",
      logo: require("./assets/images/uniroma2_logon.png"),
      subHeader: "Bachelor's Degree in Computer Science",
      duration: "July 2025",
      desc: "Recently graduated with solid academic preparation in programming, software development, and IT systems management. Gained experience in software lifecycle, backend and database management, web programming, and collaborative Agile work environments.",
      descBullets: [
        "Completed relevant coursework in software engineering, web and mobile application development, and database management",
        "Acquired practical skills during internships and junior developer experience with NextAdv s.r.l.",
        "Familiar with backend development using Node.js and MySQL",
        "Gained experience in programming languages such as Java, JavaScript, C, and Python",
        "Developed teamwork, problem-solving, time management, and communication skills through academic projects and professional experience",
        "Understood software lifecycle processes, code versioning with Git, and deployment on test environments"
      ]
    }
  ]
};



// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: false, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Frontend/Design", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Backend",
      progressPercentage: "70%"
    },
    {
      Stack: "Programming",
      progressPercentage: "60%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Junior Developer",
      company: "NextAdv s.r.l.",
      companylogo: require("./assets/images/Group-1-1.webp"), // Sostituisci con il logo corretto
      date: "Nov 2021 – Nov 2023",
      desc: "Worked as a junior developer, contributing to front-end development, testing, and quality assurance, while supporting the full software lifecycle.",
      descBullets: [
        "Developed front-end interfaces and features using JavaScript, Java, and C",
        "Carried out software testing, bug tracking, and quality assurance (Q&A)",
        "Collaborated in Agile teams and multidisciplinary environments",
        "Managed code using Git and performed deployments on test environments"
      ]
    }
  ]
};


/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: false // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Projects",
  subtitle: "PROJECTS I DEVELOPED DURING MY ACADEMIC AND PROFESSIONAL EXPERIENCE",
  projects: [
    {
      image: require("./assets/images/AquaMaster.png"), // Aggiungi un'immagine rappresentativa del progetto
      projectName: "AquaMaster",
      projectDesc: "A complete project developed during my university studies, featuring an Android app, servlet-based backend, and MySQL database.",
      footerLink: [
        {
          name: "View Repository",
          url: "https://github.com/catalinpop92/AquaMaster"
        }
      ]
    }
  ],
  display: true
};


// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle:
    "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  achievementsCards: [
    {
      title: "Google Code-In Finalist",
      subtitle:
        "First Pakistani to be selected as Google Code-in Finalist from 4000 students from 77 different countries.",
      image: require("./assets/images/codeInLogo.webp"),
      imageAlt: "Google Code-In Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://drive.google.com/file/d/0B7kazrtMwm5dYkVvNjdNWjNybWJrbndFSHpNY2NFV1p4YmU0/view?usp=sharing"
        },
        {
          name: "Award Letter",
          url: "https://drive.google.com/file/d/0B7kazrtMwm5dekxBTW5hQkg2WXUyR3QzQmR0VERiLXlGRVdF/view?usp=sharing"
        },
        {
          name: "Google Code-in Blog",
          url: "https://opensource.googleblog.com/2019/01/google-code-in-2018-winners.html"
        }
      ]
    },
    {
      title: "Google Assistant Action",
      subtitle:
        "Developed a Google Assistant Action JavaScript Guru that is available on 2 Billion devices world wide.",
      image: require("./assets/images/googleAssistantLogo.webp"),
      imageAlt: "Google Assistant Action Logo",
      footerLink: [
        {
          name: "View Google Assistant Action",
          url: "https://assistant.google.com/services/a/uid/000000100ee688ee?hl=en"
        }
      ]
    },

    {
      title: "PWA Web App Developer",
      subtitle: "Completed Certifcation from SMIT for PWA Web App Development",
      image: require("./assets/images/pwaLogo.webp"),
      imageAlt: "PWA Logo",
      footerLink: [
        {name: "Certification", url: ""},
        {
          name: "Final Project",
          url: "https://pakistan-olx-1.firebaseapp.com/"
        }
      ]
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
      title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
    {
      url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
      title: "Why REACT is The Best?",
      description:
        "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: false // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+39 388 866 4122",
  email_address: "catalin.pop927@gmail.com"
};


// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
