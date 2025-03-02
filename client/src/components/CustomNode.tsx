import React, { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { motion } from "framer-motion";

const CustomNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className="px-4 py-2 rounded-md shadow-md min-w-[180px] max-w-[220px] text-center"
      style={{
        background: data.style?.background || "#ffffff",
        borderColor: data.style?.border?.split(" ")[2] || "#dddddd",
        borderWidth: "1px",
        borderStyle: "solid",
        color: data.style?.color || "#000000",
      }}
    >
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
        className="w-3 h-3 border-2"
      />
      <div className="font-bold">{data.label}</div>
      {data.description && (
        <div
          className="mt-1 text-xs opacity-80 truncate"
          title={data.description}
        >
          {data.description.length > 50
            ? `${data.description.substring(0, 50)}...`
            : data.description}
        </div>
      )}
      <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
        className="w-3 h-3 border-2"
      />
    </motion.div>
  );
};

export default memo(CustomNode);
