import styles from "./HolidayDecor.module.css";

export default function HolidayDecor() {
  const flakes = Array.from({ length: 35 }, (_, index) => ({
    left: `${((index * 37) % 101)}%`,
    fontSize: `${8 + ((index * 7) % 12)}px`,
    opacity: 0.25 + ((index * 11) % 45) / 100,
    animationDuration: `${8 + ((index * 13) % 10)}s`,
    animationDelay: `-${(index * 17) % 19}s`,
  }));

  return (
    <div aria-hidden="true">
      <div className={styles.garland}>
        <div className="holiday-garland-lights" />
        <div className="holiday-garland-lights holiday-garland-lights-alternate" />
      </div>
      <div className={styles.snow}>
        {flakes.map((style, index) => (
          <span key={index} className={styles.flake} style={style}>❄</span>
        ))}
      </div>
    </div>
  );
}
