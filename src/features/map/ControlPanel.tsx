import * as React from "react";

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Project developed</h3>
      <h3>
        by
        <a href="https://www.linkedin.com/in/adea-pistulli/" target="_new">
          <strong> Adea Pistulli</strong>
        </a>
      </h3>

      <div className="source-link">
        <a
          href="https://github.com/deap09/adea-agricultural-appraisal-web-app"
          target="_new"
        >
          View Source Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
