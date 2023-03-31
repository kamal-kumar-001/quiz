import {
  EmojiHappyIcon,
  ChartSquareBarIcon,
  CursorClickIcon,
  DeviceMobileIcon,
  AdjustmentsIcon,
  SunIcon,
} from "@heroicons/react/outline";

import benefitOneImg from "../public/img/benefit-one.png";
import benefitTwoImg from "../public/img/benefit-two.png";

const benefitOne = {
  title: "Your content toolbox just got much more powerful.",
  desc: "With  Quiz maker, you can easily build content that will get results and make for a more engaging customer experience.",
  image: benefitOneImg,
  bullets: [
    {
      title: "User-friendly interface",
      desc: "The quiz app is designed with a user-friendly interface, making it easy for users to navigate and create their own quizzes.",
      icon: <EmojiHappyIcon />,
    },
    {
      title: "Embeddable quizzes",
      desc: "Once a quiz is created, users can easily embed it on their own websites or apps using the provided embed URL.",
      icon: <ChartSquareBarIcon />,
    },
    {
      title: "Customizable quizzes",
      desc: "Users can customize their quizzes by adding their own questions, options, and descriptions, as well as choosing the layout and design of the quiz.",
      icon: <CursorClickIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Built from the ground up with privacy in mind.",
  desc: "We will make your privacy officer happy. Not only is our quiz platform in full compliance with GDPR/CCPA, we are the privacy leaders in the industry.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Responsive design",
      desc: "The app is designed to be responsive, meaning that it looks great on all devices, including desktops, laptops, tablets, and smartphones.",
      icon: <DeviceMobileIcon />,
    },
    {
      title: "Admin page",
      desc: "The app features an admin page where users can manage their quizzes, add new quizzes, and edit existing ones.",
      icon: <AdjustmentsIcon />,
    },
    {
      title: "Robust documentation",
      desc: "The app comes with robust documentation that makes it easy for users to get started and troubleshoot any issues they may encounter.",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
