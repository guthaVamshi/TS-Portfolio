import { Container } from "@/components/ui/container";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light py-8">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="font-poppins font-medium mb-4 md:mb-0">
            © {currentYear} Vamshi Gutha. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a 
              href="https://github.com/guthaVamshi" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-light hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
            <a 
              href="mailto:vamshigutha@gmail.com" 
              className="text-light hover:text-primary transition-colors"
              aria-label="Email"
            >
              <i className="fas fa-envelope text-xl"></i>
            </a>
            <a 
              href="https://www.linkedin.com/in/vamshigutha/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-light hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a 
              href="skype:vamshigutha?call" 
              className="text-light hover:text-primary transition-colors"
              aria-label="Skype"
            >
              <i className="fab fa-skype text-xl"></i>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
