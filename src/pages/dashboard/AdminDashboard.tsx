
import { Divider } from "@mui/material";


const AdminDashboard = () => {
    return (
        <>
            <div className="p-7 flex flex-col" style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#333',
            }}>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-poppins! font-semibold mb-2">Dashboard</h2>
                </div>
                <Divider className="mb-4" />
            </div>
        </>
    )
}

export default AdminDashboard;