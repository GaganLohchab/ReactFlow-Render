import { useState, useCallback, useEffect } from "react";
import "./App.css";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "reactflow";
import CustomNode from "./CustomNode.jsx";
import CustomEdge from "./CustomEdge.jsx";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { addBranch, addNode } from "./features/node/nodeSlice.js";

const nodeTypes = { customNode: CustomNode };
const edgeTypes = {
  "custom-edge": CustomEdge,
};

function App() {
  const graph = useSelector((state) => state.graph);
  const dispatch = useDispatch();
  const [nodes, setNodes, onNodesChange] = useNodesState(graph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graph.branches);
  const [randomNodePosition, setRandomNodePosition] = useState({
    x: 10,
    y: 50,
  });
  let uid = uuidv4();

  const handleConnect = (connection) => {
    dispatch(addBranch(connection));
  };

  const handleAddNode = () => {
    const newNode = {
      id: `${uid}`,
      type: "customNode",
      data: {
        label: "New node",
      },
      position: { x: randomNodePosition.x, y: randomNodePosition.y },
      style: { backgroundColor: "#ff0071", color: "white" },
    };
    dispatch(addNode(newNode));
    setNodes((prev) => [...prev, newNode]);

    setRandomNodePosition((prevPosition) => ({
      x: prevPosition.x,
      y: prevPosition.y + 5,
    }));
  };

  useEffect(() => {
    setEdges(graph.branches);
  }, [graph.branches, graph.branches.length]);

  return (
    <div className="container">
      <div
        style={{ flex: 1, display: "flex", flexDirection: "row", gap: "45px" }}
      >
        <button
          style={{ alignSelf: "flex-start", margin: "10px" }}
          onClick={() => handleAddNode()}
        >
          Create node
        </button>

        <div style={{ flex: 1, padding: "10px" }}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={handleConnect}
              nodeTypes={nodeTypes}
              onEdgesDelete={(node) => console.log(node, "delete edge")}
              edgeTypes={edgeTypes}
              defaultEdgeOptions={{
                type: "custom-edge",
              }}
            />
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
