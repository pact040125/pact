import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  NodeTypes,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { courses, Course, Resource } from "../data/RoadmapCourseData";
import CustomNode from "../components/CustomNode";

const RoadmapPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    const foundCourse = courses.find((c) => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    }
  }, [courseId]);

  const nodeTypes = {
    input: CustomNode,
    default: CustomNode,
    output: CustomNode,
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/roadmap-courses")}
                className="mr-4 inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {course.title} Roadmap
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow flex">
        <div className="w-full h-full">
          <ReactFlow
            nodes={course.nodes}
            edges={course.edges}
            nodeTypes={nodeTypes as NodeTypes}
            onNodeClick={onNodeClick}
            connectionLineType={ConnectionLineType.SmoothStep}
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }} // Add x and y
            minZoom={0.5}
            maxZoom={1.5}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={true}
            fitView
          >
            <Background color="#f1f1f1" gap={16} />
            <Controls />
            <MiniMap
              nodeStrokeColor={(n) => {
                const border = n.style?.border;
                return typeof border === "string"
                  ? border.split(" ")[2]
                  : "#eee";
              }}
              nodeColor={(n) => {
                const background = n.style?.background;
                return typeof background === "string" ? background : "#fff";
              }}
            />
          </ReactFlow>
        </div>

        {selectedNode && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-96 bg-white border-l border-gray-200 overflow-y-auto"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedNode.data.label}
              </h2>
              <p className="mt-2 text-gray-600">
                {selectedNode.data.description}
              </p>

              {selectedNode.data.resources &&
                selectedNode.data.resources.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      Learning Resources
                    </h3>
                    <ul className="mt-2 space-y-3">
                      {selectedNode.data.resources.map(
                        (resource: Resource, index: number) => (
                          <li key={index} className="bg-gray-50 p-3 rounded-md">
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-indigo-600 hover:text-indigo-800"
                            >
                              <span className="flex-grow">
                                {resource.title}
                              </span>
                              <ExternalLink className="h-4 w-4 ml-2 flex-shrink-0" />
                            </a>
                            <span className="text-xs text-gray-500 mt-1 block capitalize">
                              {resource.type}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RoadmapPage;
