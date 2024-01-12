import "./HomePage.css";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import JoinedClasses from "../../components/JoinedClasses/JoinedClasses";
import { useSelector, useDispatch } from "react-redux";
import { getClassesAction } from "./../../redux/Actions/classAction";
import { useEffect } from "react";
import Loader from "../../components/Notifications/Loader";
import { toast } from "react-toastify";
import StartClasses from "../../components/JoinedClasses/StartClasses";

const HomePage = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, classes } = useSelector((state) => state.classes);

  const { isLoading: isUnSubriceLoading } = useSelector(
    (state) => state.unSubClass
  );

  const { isLoading: isDeleteLoading } = useSelector(
    (state) => state.deleteClass
  );

  useEffect(() => {
    dispatch(getClassesAction());

    if (isError) {
      toast.error(isError);
      dispatch({ type: "GET_CLASSES_RESET" });
    }
  }, [dispatch, isError]);

  return (
    <div className="home-page-container">
      <HomePageHeader showSidebar={true} />
      {isLoading || isUnSubriceLoading || isDeleteLoading ? (
        <Loader />
      ) : classes?.length > 0 ? (
        <ol className="joined" style={{ paddingTop: "105px" }}>
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
