import "./HomePage.css";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import JoinedClasses from "../../components/JoinedClasses/JoinedClasses";
import { useSelector, useDispatch } from "react-redux";
import { getClassesAction } from "./../../redux/Actions/classAction";
import { useEffect } from "react";
import Loader from "../../components/Notifications/Loader";
import toast from "react-hot-toast";
import StartClasses from "../../components/JoinedClasses/StartClasses";

const HomePage = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, classes } = useSelector((state) => state.classes);

  useEffect(() => {
    dispatch(getClassesAction());

    if (isError) {
      toast.error(isError);
      dispatch({ type: "GET_CLASSES_RESET" });
    }
  }, [dispatch, isError]);

  const { showSidebar } = useContext(DataContext);
  return (
    <div className="home-page-container">
      <HomePageHeader showSidebar={showSidebar} />

      {isLoading ? (
        <Loader />
      ) : classes?.length > 0 ? (
        <ol className="joined" style={{ marginTop: "65px" }}>
          {classes?.map((item) => (
            <JoinedClasses classData={item} key={item.id} />
          ))}
        </ol>
      ) : (
        <StartClasses />
      )}
    </div>
  );
};

export default HomePage;
