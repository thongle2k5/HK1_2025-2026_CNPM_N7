import dashboardService from "../services/dashboard.service.js";
const getAllTotal = async (req,res)=>{
    try{
        const total=await dashboardService.getTotal();
        res.status(200).json(total)
    }
    catch(error)
    {
        console.error("lỗi khi lấy danh sách total",error);
        resizeBy.status(500).json({message:'Lỗi server'})
    }
}
const getChartData =async (req,res)=>{
  try{
    const chart=await dashboardService.getChart();
    res.status(200).json(chart)
  }catch(error)
    {
        console.error("lỗi khi lấy danh sách chart",error);
        resizeBy.status(500).json({message:'Lỗi server'})
    }
}
export default { 
    getAllTotal,
    getChartData
}

