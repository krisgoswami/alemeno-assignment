import React, { useState, useEffect } from 'react'
import AccordianPanel from './AccordianPanel';
import Aos from 'aos'
import 'aos/dist/aos.css'
const data = [
	{
		title: "Can I get a refund if I'm not satisfied with a course?",
		description:
			'No.',
		id: 0,
	},
	{
		title: 'How can I search for courses on Alemeno?',
		description:
			'You can search for courses using the search bar on the homepage.',
		id: 1,
	},
	{
		title: 'What if I encounter technical issues while accessing a course?    ',
		description:
			"If you face technical problems, please contact our support team. We'll assist you in resolving any issues as quickly as possible.      ",
		id: 2,
	},
	{
		title: "I'm an instructor. How can I add my courses to Alemeno Courses?",
		description:
			'As an instructor, you can register as an admin, log in to your account, and then access the "Add Course" option to upload your courses, including details and content.',
		id: 3,
	},
	{
		title:
			'What are the free courses on Alemeno Courses, and how can I access them?    ',
		description:
			'We will offer a selection of free courses that you can access without any charge. They are not out yet, but you can sign up to get alerts when they are available.',
		id: 4,
	},
]

const Accordian = () => {
	const [isActive, setisActive] = useState(-1)
	function handleclick(id) {
		setisActive(isActive === id ? -1 : id)
	}
	useEffect(() => {
		Aos.init({ duration: '1000' })
	})

	return (
		<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 ">
			<div className='flex justify-center flex-col items-center gap-y-2'>

				<h1 className="md:text-3xl text-gray-900 dark:text-white font-bold" >FAQs</h1>
				{data.map((x) => {
					return (
						<AccordianPanel
							key={x.id}
							title={x.title}
							id={x.id}
							description={x.description}
							data-aos="fade-right"
						></AccordianPanel>
					)
				})}
			</div>
		</div>
	)
}
export default Accordian