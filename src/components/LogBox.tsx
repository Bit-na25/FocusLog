import { Link } from "react-router-dom";
import ContentBox from "./common/ContentBox";
import RandomLog from "./RandomLog";
export default function LogBox() {
  const data = Math.round(Math.random());

  return (
    <ContentBox>
      {data ? (
        <Link to="/retrospect">
          <RandomLog />
        </Link>
      ) : (
        <Link to="/timer">
          <div className="text-center text-sm text-gray-400">회고가 아직 없습니다.</div>
        </Link>
      )}
    </ContentBox>
  );
}
