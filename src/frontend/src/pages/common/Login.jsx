export default function app(){
    return (   
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-200 ">
      <div className="w-[500px] h-[400px] bg-white border rounded-lg focus:ring-2 focus:ring-blue-400 shadow-lg ">
        <h1 className="flex justify-center pt-4 font-bold text-2xl">
             Smart School Bus Tracking
        </h1>

        <div className="w-[400px] h-[150px] m-auto mt-10">

        <input 
        type="text" 
        placeholder="Nhập tài khoản" 
        className="w-full px-4 py-4  border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" 
        />

        <input 
        type="text" 
        placeholder="Nhập mật khẩu" 
        className="w-full border px-4 py-4 my-4 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" 
        />

        <button className="w-full py-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 ">
        Đăng nhập 
        </button>

        <div className="flex py-2 justify-between  ">
         <div className="hover:underline text-blue-500 cursor-pointer">Quên mật khẩu ?</div>
         <div className="hover:underline text-blue-500 cursor-pointer">Đăng ký</div>
        </div>
      </div>
     </div>
    </div>
   
    ); 
}