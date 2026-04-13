import React, { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Smooth CSS-transform based mobile slider.
 * - Touch-swipe gesture support
 * - Elongated dot indicator (Apple-style)
 * - Circular arrow button
 * - Works with any card children
 */
const MobileSlider = ({ children, darkTheme = false }) => {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const items = React.Children.toArray(children);
  const total = items.length;

  const goTo = (i) => setIndex(Math.max(0, Math.min(i, total - 1)));

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY);

    // Only swipe horizontally (ignore vertical scrolls)
    if (Math.abs(dx) > dy && Math.abs(dx) > 36) {
      dx > 0 ? goTo(index + 1) : goTo(index - 1);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const textColor = darkTheme ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)';
  const activeColor = darkTheme ? '#ffffff' : '#000000';

  return (
    <div className="mslider-outer">
      {/* ── Track ── */}
      <div
        className="mslider-track"
        style={{
          transform: `translateX(calc(20px - ${index} * (82vw + 14px)))`,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((child, i) => (
          <div className="mslider-item" key={i}>
            {child}
          </div>
        ))}
      </div>

      {/* ── Progress dots ── */}
      <div className="mslider-dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={`mslider-dot${i === index ? ' mslider-dot--active' : ''}`}
            style={{
              background: i === index ? activeColor : textColor,
            }}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Next arrow ── */}
      {index < total - 1 && (
        <button
          className={`mslider-arrow${darkTheme ? ' mslider-arrow--dark' : ''}`}
          onClick={() => goTo(index + 1)}
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default MobileSlider;
