
interface Props{
    togglePopup: ()=>void;
    popupVisible: boolean;
}
function Popup({togglePopup, popupVisible} : Props) {

    return (
        <>
            <div className='mt-6 mr-5 flex flex-row justify-end'>
                <button
                    className="bg-black top-1 text-white rounded-full p-2"
                    onClick={togglePopup}
                >
                    About Us
                </button>
            </div>
            {popupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-xl shadow-lg">
                        <h2 className="text-xl font-bold mb-4">About This Project</h2>
                        <p className="text-gray-700 text-justify leading-relaxed space-y-4">
                        เป็นเว็บแอพพลิเคชันสำหรับวิเคราะห์ข้อความที่อาจจะเกี่ยวกับความซึมเศร้า<br/>
                        จัดทำโดยนิสิตนักศึกษามหาวิทยาลัยศรีนครินทรวิโรฒ<br/>
                        ผลงานชิ้นนี้เป็นส่วนหนึ่งของวิจัยปริญญาตรี<br/>
                        หากมีข้อผิดพลาดประการใด คณะผู้จัดทำต้องขออภัยมา ณ ที่นี้
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={togglePopup}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Close
                            </button>
                            <p className="text-gray-700 mt-4">คณะผู้จัดทำ</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Popup;