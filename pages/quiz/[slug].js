import React from 'react'
import Default from '../../components/quizTemplates/default';
// import MCQ from '../../components/quizTemplates/mcq'
// import MCQ2 from '../../components/quizTemplates/mcq2';

const Quiz = ({ quizzes, template }) => {
  // console.log(template);
  return (
    // <Default quizzes={quizzes} template={template}/>
    <Default
      quizzes={quizzes}
      name={template?.name || 'defaultName'}
      mainColor={template?.mainColor || '#000000'}
      textColor={template?.textColor || '#000000'}
      bgColor={template?.bgColor || '#ffffff'}
      buttonType={template?.buttonType || 'block'}
      width={template?.width || 400}
      height={template?.height || 500}
      font={template?.font || 'Arial'}
      fontSize={template?.fontSize || 14}
    />
  )
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://quiz-mrnormal128-gmailcom.vercel.app'; 
  const res = await fetch(`${apiUrl}/api/quiz/${slug}`);
  // const res = await fetch(`https://quiz-mrnormal128-gmailcom.vercel.app/api/quiz/${slug}`);
  const { template, quiz } = await res.json();
  // const data = await res.json();

  return {
    props: {
      quizzes: quiz || null,
      template: template || null,
    },
  };
}

export default Quiz;
