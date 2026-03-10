/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 1500 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Catalin Ardelean Pop",
  title: "greeting.title",
  subTitle: "greeting.subtitle",
  resumeLink:
    "https://drive.google.com/uc?export=download&id=18mhCE_w93jfvLASkO7R0920D7SObEv3b",
  displayGreeting: true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/catalinpop92",
  linkedin: "https://www.linkedin.com/in/catalin-pop7/",
  gmail: "catalin.pop927@gmail.com",
  //gitlab: "",
  //facebook: "",
  instagram: "https://www.instagram.com/catalin_pop7/",
  //medium: "",
  //stackoverflow: "",
  display: true // Set true to display this section, defaults to false
};


// Skills Section

// Skills Section
const skillsSection = {
  title: "skills.title",
  subTitle: "skills.subtitle",
  skills: [
    "skills.job.0",
    "skills.job.1",
    "skills.job.2",
    "skills.job.3",
    "skills.job.4",
    "skills.job.5",
    "skills.job.6",
    "skills.job.7",
    "skills.job.8"
  ],

  /* Include all technologies mentioned in the CV */
softwareSkills: [
  // Linguaggi e sviluppo
  { skillName: "Java", fontAwesomeClassname: "fas fa-coffee" },
  { skillName: "JavaScript", fontAwesomeClassname: "fab fa-js" },
  { skillName: "C", fontAwesomeClassname: "fas fa-code" },
  { skillName: "Python", fontAwesomeClassname: "fab fa-python" },
  { skillName: "SQL", fontAwesomeClassname: "fas fa-database" },
  { skillName: "MySQL", fontAwesomeClassname: "fas fa-database" },
  { skillName: "MongoDB", fontAwesomeClassname: "fas fa-database" },
  { skillName: "HTML5", fontAwesomeClassname: "fab fa-html5" },
  { skillName: "CSS3", fontAwesomeClassname: "fab fa-css3-alt" },
  { skillName: "Node.js", fontAwesomeClassname: "fab fa-node" },
  { skillName: "Express.js", fontAwesomeClassname: "fas fa-server" },

  // Strumenti generali
  { skillName: "Git", fontAwesomeClassname: "fab fa-git" },
  { skillName: "VSCode", fontAwesomeClassname: "fas fa-laptop-code" },
  { skillName: "Eclipse", fontAwesomeClassname: "fas fa-laptop-code" },
  { skillName: "Postman", fontAwesomeClassname: "fas fa-vial" },
  { skillName: "Figma", fontAwesomeClassname: "fas fa-pencil-ruler" },
  { skillName: "Camunda", fontAwesomeClassname: "fas fa-cogs" },

  // Cyber Security tools
  { skillName: "Windows", fontAwesomeClassname: "fab fa-windows" },
  { skillName: "Splunk", fontAwesomeClassname: "fas fa-chart-line" },
  { skillName: "Nmap", fontAwesomeClassname: "fas fa-search" },
  { skillName: "Metasploit", fontAwesomeClassname: "fas fa-bug" },
  { skillName: "VirtualBox", fontAwesomeClassname: "fas fa-box" },
  { skillName: "Nessus", fontAwesomeClassname: "fas fa-shield-alt" },
  { skillName: "Kali Linux", fontAwesomeClassname: "fab fa-linux" },
  { skillName: "Wireshark", fontAwesomeClassname: "fas fa-network-wired" },
  { skillName: "Burp Suite", fontAwesomeClassname: "fas fa-shield-alt" },
  { skillName: "Hydra", fontAwesomeClassname: "fas fa-lock" }
],
display: true
};


// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "edu.card.0.schoolName",
      logo: require("./assets/images/uniroma2_logon.png"),
      subHeader: "edu.card.0.subHeader",
      duration: "2025",
      desc: "edu.card.0.desc",
      descBullets: [
        "edu.card.0.descBullets.0",
        "edu.card.0.descBullets.1",
        "edu.card.0.descBullets.2",
        "edu.card.0.descBullets.3",
        "edu.card.0.descBullets.4",
        "edu.card.0.descBullets.5"
      ]
    },
    {
      schoolName: "edu.card.1.schoolName",
      logo: require("./assets/images/EPICODE-pitto-color.webp"), // Inserisci il logo del Master
      subHeader: "edu.card.1.subHeader",
      duration: "2026",
      desc: "edu.card.1.desc",
      descBullets: [
        "edu.card.1.descBullets.0",
        "edu.card.1.descBullets.1",
        "edu.card.1.descBullets.2",
        "edu.card.1.descBullets.3",
        "edu.card.1.descBullets.4",
        "edu.card.1.descBullets.5"
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
      role: "work.card.0.role",
      company: "work.card.0.company",
      companylogo: require("./assets/images/Group-1-1.webp"), // Sostituisci con il logo corretto
      date: "Nov 2021 – Nov 2023",
      desc: "work.card.0.desc",
      descBullets: [
        "work.card.0.descBullets.0",
        "work.card.0.descBullets.1",
        "work.card.0.descBullets.2",
        "work.card.0.descBullets.3"
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
  title: "startup.title",
  subtitle: "startup.subtitle",
  projects: [
    {
      image: require("./assets/images/AquaMaster.png"),
      projectName: "projects.card.0.projectName",
      projectDesc: "projects.card.0.projectDesc",
      footerLink: [
        {
          name: "startup.link.viewRepository",
          url: "https://github.com/catalinpop92/AquaMaster"
        }
      ]
    },
    {
      image: require("./assets/images/architecture-overview.png"),
      projectName: "projects.card.1.projectName",
      projectDesc: "projects.card.1.projectDesc",
      footerLink: [
        {
          name: "startup.link.viewRepository",
          url: "https://github.com/catalinpop92/Tesi"
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
      title: "achievement.card.0.title",
      subtitle: "achievement.card.0.subtitle",
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
      title: "achievement.card.1.title",
      subtitle: "achievement.card.1.subtitle",
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
      title: "achievement.card.2.title",
      subtitle: "achievement.card.2.subtitle",
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
      title: "talks.card.0.title",
      subtitle: "talks.card.0.subtitle",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: "podcast.title",
  subtitle: "podcast.subtitle",

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
