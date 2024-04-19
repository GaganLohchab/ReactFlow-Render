import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
} from "reactflow";
import "./CustomNode.css";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { removeBranch } from "./features/node/nodeSlice";

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const dispatch = useDispatch();
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const deleteEdgeById = (id) => {
    dispatch(removeBranch(id));
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
            background: "red",
            width: "10px",
            height: "10px",
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2px",
          }}
          className="nodrag nopan"
          onClick={() => {
            console.log(id);
            deleteEdgeById(id);
          }}
        >
          <IoMdClose />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
