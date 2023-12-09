import { Avatar } from "@mui/material";
import "./ClassroomEveryoneTeacher.css";
const ClassroomEveryoneTeacher = () => {
    return ( 
        <div className="classroom-everyone-teacher-container">
            <Avatar sx={{width: 35, height: 35, backgroundColor: "#a0c3ff", color: "#4374e0"}}/>
            <div className="classroom-everyone-teacher-name">Nguyen Huu Thien Thien</div>
        </div>
     );
}
 
export default ClassroomEveryoneTeacher;