import Link from 'next/link';
import React, { useState } from 'react'

const Pricing = () => {
	const [pricing , setPricing] = useState('Monthly')
  
	const personalPlan = {
	  name: 'Personal',
	  priceMonthly: 'FREE',
	  priceAnnual: 'FREE',
	  features: [
		'Create and publish up to 5 quizzes',
		'Add up to 20 questions per quiz',
		'Allow up to 100 quiz takers per month',
		'Export quiz results to CSV format',
	  ],
	}
  
	const professionalPlan = {
	  name: 'Professional',
	  priceMonthly: 10,
	  priceAnnual: 100,
	  features: [
		'Create and publish up to 20 quizzes',
		'Add up to 50 questions per quiz',
		'Allow up to 500 quiz takers per month',
		'Export quiz results to CSV format',
		'Customize quiz branding and design',
		'Advanced analytics and reporting',
	  ],
	}
  
	const businessPlan = {
	  name: 'Business',
	  priceMonthly: 20,
	  priceAnnual: 200,
	  features: [
		'Create and publish unlimited quizzes',
		'Add unlimited questions per quiz',
		'Allow unlimited quiz takers per month',
		'Export quiz results to CSV format',
		'Customize quiz branding and design',
		'Advanced analytics and reporting',
		'Single Sign-On (SSO) integration',
		'Priority support',
	  ],
	}

  return (
    <div>
        <section className=" dark:bg-gray-800 dark:text-gray-50">
	<div className="container mx-auto px-4 sm:p-10">
		<div className="mb-8 space-y-4 text-center">
			<div>
				<button onClick={() => setPricing('Monthly')} className={`px-4 py-1  border rounded-l-lg dark:border-indigo-400 border-indigo-400 ${pricing ==='Monthly' && 'dark:bg-indigo-400 bg-indigo-400 font-semibold dark:text-gray-900' }`}>Monthly</button>
				<button onClick={() =>setPricing('Annually')} className={`px-4 py-1 border rounded-r-lg dark:border-indigo-400 border-indigo-400 ${pricing ==='Annually' && 'dark:bg-indigo-400 bg-indigo-400 font-semibold dark:text-gray-900' }`}>Annual</button>
			</div>
		</div>
		<div className="grid max-w-md grid-cols-1 gap-6 mx-auto auto-rows-fr lg:max-w-full lg:gap-2 xl:gap-6 lg:grid-cols-3">
			
			<div className="relative z-0 flex flex-col items-center p-8 border rounded-md">
				<span className="absolute top-0 px-6 pt-1 pb-2 font-medium rounded-b-lg dark:bg-indigo-400 bg-indigo-400 dark:text-gray-900">{personalPlan.name}</span>
				<p className="my-6 text-4xl font-bold dark:text-indigo-400">{pricing==='Monthly' ?  personalPlan.priceMonthly : personalPlan.priceAnnual  }</p>
				<ul className="flex-1 space-y-2">
				{personalPlan && personalPlan.features.map((feature,index) =>(
					<li key={index} className="flex items-center space-x-2">
						
						<span>{feature}</span>
					</li>
				))}
				</ul>
				<Link href={'/signup'} className="px-4 py-2 mt-4 font-semibold uppercase border rounded-lg md:mt-12 sm:py-3 sm:px-8 dark:border-indigo-400 border-indigo-400">Try For Free</Link>
			</div>
			<div className="relative flex flex-col items-center p-8 border-2 rounded-md dark:border-indigo-400 border-indigo-400 dark:bg-gray-800">
				<span className="absolute top-0 px-6 pt-1 pb-2 font-medium rounded-b-lg dark:bg-indigo-400 bg-indigo-400 dark:text-gray-900">{professionalPlan.name}</span>
				{pricing==='Monthly' ? (<p className="flex items-center justify-center my-6 space-x-2 font-bold">

					{/* <span className="text-lg line-through dark:text-gray-300">&nbsp;32€&nbsp;</span> */}
					<span className="pb-2 text-4xl">&#36;{ professionalPlan.priceMonthly} </span>
					<span className="text-lg">/Monthly</span>
				</p>) : (
					<p className="flex items-center justify-center my-6 space-x-2 font-bold">
					<span className="text-lg line-through dark:text-gray-300">&nbsp;&#36;{professionalPlan.priceMonthly*12}&nbsp;</span>
					<span className="pb-2 text-4xl">&#36;{ professionalPlan.priceAnnual} </span>
					<span className="text-lg"> /Annually</span>
				</p>
				)}
				<ul className="flex-1 space-y-2">
				{professionalPlan && professionalPlan.features.map((feature,index) =>(
					<li key={index} className="flex items-center space-x-2">
						
						<span>{feature}</span>
					</li>
				))}
				</ul>
				<Link href={'/signup'} className="px-8 py-3 mt-12 text-lg font-semibold uppercase rounded dark:bg-indigo-400 bg-indigo-400 dark:text-gray-900">Try For Free</Link>
			</div>
			<div className="relative z-0 flex flex-col items-center p-8 border rounded-md dark:bg-gray-800">
				<span className="absolute top-0 px-6 pt-1 pb-2 font-medium rounded-b-lg dark:bg-indigo-400 bg-indigo-400 dark:text-gray-900">{businessPlan.name}</span>
				{pricing==='Monthly' ? (<p className="flex items-center justify-center my-6 space-x-2 font-bold">

					{/* <span className="text-lg line-through dark:text-gray-300">&nbsp;32€&nbsp;</span> */}
					<span className="pb-2 text-4xl"> &#36;{ businessPlan.priceMonthly} </span>
					<span className="text-lg">/Monthly</span>
				</p>) : (
					<p className="flex items-center justify-center my-6 space-x-2 font-bold">
					<span className="text-lg line-through dark:text-gray-300">&nbsp;&#36;{businessPlan.priceMonthly*12}&nbsp;</span>
					<span className="pb-2 text-4xl">&#36;{ businessPlan.priceAnnual} </span>
					<span className="text-lg"> /Annually</span>
				</p>
				)}
				<ul className="flex-1 space-y-2">
				{businessPlan && businessPlan.features.map((feature,index) =>(
					<li key={index} className="flex items-center space-x-2">
						<span>{feature}</span>
					</li>
				))}
				</ul>

				<Link href={'/signup'} className="px-8 py-3 mt-12 text-lg font-semibold uppercase border rounded dark:border-indigo-400 border-indigo-400">Try For Free</Link>
			</div>
		</div>
	</div>
</section>

    </div>
  )
}

export default Pricing