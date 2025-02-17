import React, { useState, useEffect } from 'react';
import { Terminal, AlertCircle } from 'lucide-react';

const ComingSoon = () => {
  const [showCursor, setShowCursor] = useState(true);
  const [currentText, setCurrentText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  const terminalLines = [
    { text: 'Initializing FPL Terminal v1.0...', persist: true },
    { text: 'Loading player database...', persist: true },
    { text: 'Executing strategic protocol...', persist: true },
    { text: 'Hello, friend...', persist: false, deleteAfter: true },
    { text: 'Running fsociety.dat...', persist: false },
    { text: 'Scanning for optimal differentials...', persist: true },
    { text: 'Bypassing template team constraints...', persist: true },
    { text: 'System preparing for launch...', persist: true },
  ];

  useEffect(() => {
    // Blink cursor
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Type or delete text
    
    let timeout: ReturnType<typeof setTimeout>;
    if (currentLine < terminalLines.length) {
      const line = terminalLines[currentLine];
      
      if (isDeleting) {
        // Deleting text
        if (currentText.length > 0) {
          timeout = setTimeout(() => {
            setCurrentText(prev => prev.slice(0, -1));
          }, 50);
        } else {
          // Done deleting
          timeout = setTimeout(() => {
            setIsDeleting(false);
            setCurrentLine(prev => prev + 1);
            setCurrentText('');
          }, 500);
        }
      } else {
        // Typing text
        if (currentText.length < line.text.length) {
          timeout = setTimeout(() => {
            setCurrentText(line.text.slice(0, currentText.length + 1));
          }, 50);
        } else {
          // Done typing
          timeout = setTimeout(() => {
            if (line.deleteAfter) {
              setIsDeleting(true);
            } else {
              if (line.persist) {
                setDisplayedLines(prev => [...prev, line.text]);
              }
              setCurrentLine(prev => prev + 1);
              setCurrentText('');
            }
          }, line.persist ? 1000 : 2000);
        }
      }
    }

    return () => {
      clearInterval(cursorInterval);
      clearTimeout(timeout);
    };
  }, [currentText, currentLine, isDeleting]);

  const style = `
    @keyframes pulse {
      0% { opacity: 0.7; }
      50% { opacity: 1; }
      100% { opacity: 0.7; }
    }
    .pulse {
      animation: pulse 2s infinite;
    }
  `;

  return (
    <div className="min-h-screen bg-black text-orange-500 font-mono flex flex-col">
      <style>{style}</style>
      
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center space-x-2">
          <Terminal className="h-5 w-5" />
          <span className="text-xl font-bold">FPL TERMINAL</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        {/* Terminal Window */}
        <div className="border border-gray-800 rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-4 w-4 text-green-500 pulse" />
            <span className="text-green-500">SYSTEM STATUS: INITIALIZATION</span>
          </div>
          
          {/* Terminal Lines */}
          <div className="space-y-2 h-64 overflow-y-auto">
            {displayedLines.map((line, index) => (
              <div key={index} className="text-green-500">{'>'} {line}</div>
            ))}
            <div className="text-green-500">
              {'>'} {currentText}{showCursor ? '█' : ' '}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl mb-4">LAUNCHING SOON</h2>
              <p className="text-gray-400">
                A powerful terminal-based interface for Fantasy Premier League analytics.
                Bringing institutional-grade analysis to your FPL strategy.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg mb-3">DEVELOPMENT STATUS</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Core System</span>
                  <span className="text-green-500">75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data Processing</span>
                  <span className="text-green-500">82%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">UI Development</span>
                  <span className="text-green-500">60%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Testing</span>
                  <span className="text-yellow-500">45%</span>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 p-4 text-center space-y-2">
        <div className="text-gray-500">
          Advanced FPL analytics. Coming soon.
        </div>
        <div className="text-gray-600">
          For updates: <span className="text-orange-500">@PelicanLabs</span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;