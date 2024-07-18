const ExamRenderer = ({ content }: { content: string }) => {
  if (!content) {
    return <p className="text-red-600">O conteúdo não foi carregado corretamente.</p>;
  }

  const renderContent = () => {
    const lines = content.split('\n');
    const renderedLines = lines.map((line, index) => {
      if (line.startsWith('### ') || line.startsWith('#### ')) {
        return (
          <h3 className="text-lg font-semibold my-1" key={index}>
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith('## ')) {
        return (
          <h2 className="text-xl font-semibold my-2" key={index}>
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('# ')) {
        return (
          <h1 className="text-3xl font-bold my-3 text-center" key={index}>
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('- ')) {
        if (line.trim() === '-') {
          return <br key={index} />;
        } else if (line.trim().startsWith('- ')) {
          return (
            <li className="ml-6 list-disc" key={index}>
              {line.substring(2)}
            </li>
          );
        } else {
          return (
            <li className="ml-4 list-disc" key={index}>
              {line.substring(2)}
            </li>
          );
        }
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return (
          <p className="my-2" key={index}>
            {line}
          </p>
        );
      }
    });

    return <ul>{renderedLines}</ul>;
  };

  return (
    <div className="p-6 shadow-lg max-w-3xl">
      {renderContent()}
    </div>
  );
};

export default ExamRenderer;
