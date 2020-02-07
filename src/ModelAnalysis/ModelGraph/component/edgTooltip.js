import React from 'react';
import styles from './index.css';

const EdgeToolTips = ({ x, y, info }) => {
  return (
    <div className={styles.edgeTooltips} style={{ top: `${y}px`, left: `${x}px` }}>
      <div className={styles.edgeTitle}>
        <p className={styles.tooltipsCommon}>来源:{info.getSource().getModel().name}</p>
        <p className={styles.tooltipsCommon}>去向:{info.getTarget().getModel().name}</p>
      </div>
    </div>
  );
};

export default EdgeToolTips;
