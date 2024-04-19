import { memo } from "react";
import {
  Handle,
  Position,
  NodeToolbar,
  useNodes,
  useReactFlow,
  useEdges,
} from "reactflow";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { removeNode } from "./features/node/nodeSlice";

const CustomNode = ({ data, id }) => {
  const dispatch = useDispatch();
  const { setNodes } = useReactFlow();
  const nodes = useNodes();

  const deleteNodeById = (id) => {
    dispatch(removeNode(id));
    setNodes((nds) => nds.filter((nd) => nd.id != id));
  };
  return (
    <div className="text-updater-node">
      <NodeToolbar
        align="end"
        isVisible={data.toolbarVisible}
        position={data.toolbarPosition}
        offset={1}
      >
        <div
          style={{
            background: "red",
            borderRadius: "100%",
            width: "20px",
            height: "20px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => deleteNodeById(id)}
        >
          <IoMdClose />
        </div>
      </NodeToolbar>
      <div>
        <input
          id="text"
          name="text"
          onChange={() => {}}
          className="nodrag"
          style={{ textAlign: "center" }}
        />
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(CustomNode);
