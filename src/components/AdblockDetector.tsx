
import { useEffect, useState } from 'react';

const AdblockDetector = () => {
  const [isAdblockDetected, setIsAdblockDetected] = useState(false);

  useEffect(() => {
    // Create a test element that ad blockers typically hide
    const testElement = document.createElement('div');
    testElement.className = 'adsbox';
    testElement.style.cssText = 'height:1px;position:absolute;left:-999px;';
    testElement.innerHTML = '&nbsp;';
    document.body.appendChild(testElement);

    // Check if the element is blocked after a short delay
    const timeoutId = setTimeout(() => {
      if (!testElement.offsetHeight) {
        setIsAdblockDetected(true);
      }
      testElement.remove();
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (document.body.contains(testElement)) {
        testElement.remove();
      }
    };
  }, []);

  if (!isAdblockDetected) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] bg-red-500 text-white p-4 text-center font-sans"
      role="alert"
    >
      Please disable your ad blocker to continue using this site.
    </div>
  );
};

export default AdblockDetector;
