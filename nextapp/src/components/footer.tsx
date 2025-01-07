import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} TrendShield. All rights reserved.</p>
      <div className={styles.socialLinks}>
        <a href="https://x.com/MayankxShar" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://www.linkedin.com/in/mayanksharma2003/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/Shar-mayank0/TrendShield" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </footer>
  );
};

export default Footer;
