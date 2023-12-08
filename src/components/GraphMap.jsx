import React, { useRef, useState } from 'react';
import { GraphCanvas, useSelection } from 'reagraph';

export const GraphMap = () => {
  const graphRef = useRef(null);

  const { selections, onNodeClick, onCanvasClick ,onNodePointerOver, onNodePointerOut, actives} = useSelection({ ref: graphRef, focusOnSelect: true,pathHoverType: 'out' });

  // Node'ları ve Edgeleri tutan state'ler
  const [nodes, setNodes] = useState([
    {
      id: '1',
      label: '1'
    },
    {
      id: '2',
      label: '2'
    }
  ]);

  const [edges, setEdges] = useState([
    {
      source: '1',
      target: '2',
      id: '1-2',
      label: '1-2',
      size: 20
    }
  ]);

  const handleNodeClick = (node) => {
    const newNode = {
      id: `newNode${nodes.length + 1}`,
      label: `New Node ${nodes.length + 1}`
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);

    const newEdge = {
      source: node.id,
      target: newNode.id,
      id: `${node.id}-${newNode.id}`,
      label: `${node.id}-${newNode.id}`
    };

    setEdges((prevEdges) => [...prevEdges, newEdge]);
  };

  return (
    <>
      <GraphCanvas
        theme={{
          canvas: { background: '#fff' },
          node: {
            fill: '#7CA0AB',
            activeFill: '#1DE9AC',
            opacity: 1,
            selectedOpacity: 1,
            inactiveOpacity: 0.2,
            label: {
              color: '#2A6475',
              stroke: '#fff',
              activeColor: '#1DE9AC'
            },
            subLabel: {
              color: '#ddd',
              stroke: 'transparent',
              activeColor: '#1DE9AC'
            }
          },
          lasso: {
            border: '1px solid #55aaff',
            background: 'rgba(75, 160, 255, 0.1)'
          },
          ring: {
            fill: '#D8E6EA',
            activeFill: '#1DE9AC'
          },
          edge: {
            fill: '#D8E6EA',
            activeFill: '#1DE9AC',
            opacity: 1,
            selectedOpacity: 1,
            inactiveOpacity: 0.1,
            label: {
              stroke: '#fff',
              color: '#2A6475',
              activeColor: '#1DE9AC'
            }
          },
          arrow: {
            fill: '#D8E6EA',
            activeFill: '#1DE9AC'
          },
          cluster: {
            stroke: '#D8E6EA',
            opacity: 1,
            selectedOpacity: 1,
            inactiveOpacity: 0.1,
            label: {
              stroke: '#fff',
              color: '#2A6475'
            }
          }
        }}
        ref={graphRef}
        nodes={nodes}
        edges={edges}
        selections={selections} 
        actives={actives}
        onCanvasClick={onCanvasClick}
        onNodePointerOver={onNodePointerOver} 
        onNodePointerOut={onNodePointerOut}
        onNodeClick={(node) => {
          onNodeClick(node); // Selection'ı güncelle
          handleNodeClick(node); // Yeni node ve edge'leri ekleyerek state'i güncelle
        }}
      />
    </>
  );
};
