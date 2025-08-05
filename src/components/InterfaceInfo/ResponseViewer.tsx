// src/components/ResponseViewer.tsx
import React from 'react';

const JsonPretty = ({ data }: { data?: string }) => {
  if (!data) return <span style={{ color: '#aaa' }}>无</span>;
  try {
    return (
      <pre
        style={{
          background: '#f6f6f6',
          padding: 12,
          borderRadius: 4,
          maxHeight: 300,
          overflow: 'auto',
        }}
      >
        {JSON.stringify(JSON.parse(data), null, 2)}
      </pre>
    );
  } catch {
    return <span style={{ color: 'red' }}>非合法JSON</span>;
  }
};

const ResponseViewer: React.FC<{ type: string; data: any }> = ({ type, data }) => {
  if (type.includes('application/json')) {
    return <JsonPretty data={typeof data === 'string' ? data : JSON.stringify(data)} />;
  }
  if (type.includes('text/event-stream')) {
    // SSE流式数据，data为字符串数组
    return (
      <pre
        style={{
          background: '#f6f6f6',
          padding: 12,
          borderRadius: 4,
          maxHeight: 300,
          overflow: 'auto',
        }}
      >
        {Array.isArray(data) ? data.join('') : data}
      </pre>
    );
  }
  // 其他类型，直接文本展示
  return (
    <pre
      style={{
        background: '#f6f6f6',
        padding: 12,
        borderRadius: 4,
        maxHeight: 300,
        overflow: 'auto',
      }}
    >
      {typeof data === 'string' ? data : JSON.stringify(data)}
    </pre>
  );
};

export default ResponseViewer;
