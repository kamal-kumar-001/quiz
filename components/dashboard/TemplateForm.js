import { useState } from 'react';
import Default from '../quizTemplates/default';
import axios from 'axios';
import { useRouter } from 'next/router';
import { quizzes } from '../dashboard/data'

const TemplateForm = ({ template}) => {
    const [name, setName] = useState(template?.name || 'Untitled');
    const [mainColor, setMainColor] = useState(template?.mainColor || '#000000');
    const [textColor, setTextColor] = useState(template?.textColor || '#000000');
    const [bgColor, setBgColor] = useState(template?.bgColor || '#ffffff');
    const [buttonType, setButtonType] = useState(template?.buttonType || 'block');
    const [width, setWidth] = useState(template?.width || 400);
    const [height, setHeight] = useState(template?.height || 500);
    const [font, setFont] = useState(template?.font || 'Arial');
    const [fontSize, setFontSize] = useState(template?.fontSize || 14);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Template = { name, mainColor, textColor, bgColor, buttonType, width, height, font, fontSize,};
        try {
            let url = `/api/template`;
            let method = 'post';
            if (template._id != null) {
                url += `?id=${template?._id}`;
                method = 'put';
            }
            const response = await axios({
                method,
                url,
                data: Template,
            });
            // console.log(token);
            router.push('/admin/template/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='flex flex-wrap'>
        <form onSubmit={handleSubmit} className="p-8  md:w-1/2 lg:w-1/2 xl:w-1/2">
            <div className="mb-4 absolute top-5 right-5">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Save
                    </button>
                </div>
            {/* <div className="mb-4">
                <label htmlFor="name" className="block  font-bold mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                />
            </div> */}

            <div className="mb-4">
                <label htmlFor="mainColor" className="block  font-bold mb-2">
                    Main Color
                </label>
                <input
                    type="color"
                    id="mainColor"
                    value={mainColor}
                    onChange={(event) => setMainColor(event.target.value)}
                    className="appearance-none w-1/2 h-10 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="textColor" className="block  font-bold mb-2">
                    Text Color
                </label>
                <input
                    type="color"
                    id="textColor"
                    value={textColor}
                    onChange={(event) => setTextColor(event.target.value)}
                    className="appearance-none w-1/2 h-10 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="bgColor" className="block  font-bold mb-2">
                    Background Color
                </label>
                <input
                    type="color"
                    id="bgColor"
                    value={bgColor}
                    onChange={(event) => setBgColor(event.target.value)}
                    className="appearance-none w-1/2 h-10 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="buttonType" className="block  font-bold mb-2">
                    Button Type
                </label>
                <select
                    id="buttonType"
                    value={buttonType}
                    onChange={(event) => setButtonType(event.target.value)}
                    className="appearance-none w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="block">Block</option>
                    <option value="radio">Radio</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="width" className="block  font-bold mb-2">
                     Width
                </label>
                <input
                    type='number'
                    id="width"
                    value={width}
                    onChange={(event) => setWidth(event.target.value)}
                    className="appearance-none w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="height" className="block  font-bold mb-2">
                     Height
                </label>
                <input
                    type='number'
                    id="height"
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                    className="appearance-none w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            {/* <div className="mb-4">
                <label htmlFor="font" className="block  font-bold mb-2">
                    Font
                </label>
                <input
                    type="text"
                    id="font"
                    value={font}
                    onChange={(event) => setFont(event.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                />
            </div> */}
            <div className="mb-4">
                <label htmlFor="fontSize" className="block  font-bold mb-2">
                    Font Size
                </label>
                <input
                    type="text"
                    id="fontSize"
                    value={fontSize}
                    onChange={(event) => setFontSize(event.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
        </form>
        <div className='w-1/2 p-8'>
            {/* <Default quizzes={quizzes} template={template} /> */}
            <Default quizzes={quizzes} name={name} mainColor={mainColor} textColor={textColor} bgColor={bgColor} buttonType={buttonType} width={width} height={height} font={font} fontSize={fontSize} />
        </div>
        </div>
    )
}
export default TemplateForm
