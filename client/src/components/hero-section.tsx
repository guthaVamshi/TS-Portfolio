import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { motion } from "framer-motion";
import { styled } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'wouter';
import resume  from '../Files/Vamshi Gutha FSD.pdf';

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(16),
  paddingBottom: theme.spacing(16),
  position: 'relative',
  zIndex: 10,
}));

const GradientBox = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(108,99,255,0.05) 50%, rgba(255,255,255,0.9) 100%)',
});

const PatternBox = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0.2,
  background: 'radial-gradient(#6C63FF 1px, transparent 1px)',
  backgroundSize: '20px 20px',
});

const BlurredCircle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(100px)',
  animation: 'blob 7s infinite',
  '@keyframes blob': {
    '0%': { transform: 'translate(0, 0) scale(1)' },
    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
    '100%': { transform: 'translate(0, 0) scale(1)' },
  },
}));

const SocialButton = styled(Button)(({ theme }) => ({
  minWidth: 'auto',
  width: 40,
  height: 40,
  borderRadius: '50%',
  padding: 0,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

export default function HeroSection() {
  return (
    <Box component="section" minHeight="100vh" display="flex" alignItems="center" position="relative">
      <GradientBox />
      <PatternBox />
      
      {/* Animated blurred shapes */}
      <BlurredCircle
        sx={{
          top: '20%',
          right: '20%',
          width: 256,
          height: 256,
          bgcolor: 'primary.light',
          opacity: 0.3,
        }}
      />
      <BlurredCircle
        sx={{
          bottom: '20%',
          left: '20%',
          width: 288,
          height: 288,
          bgcolor: 'secondary.light',
          opacity: 0.1,
        }}
      />
      <BlurredCircle
        sx={{
          bottom: '40%',
          right: '30%',
          width: 256,
          height: 256,
          bgcolor: 'info.light',
          opacity: 0.1,
        }}
      />
      
      <StyledContainer>
        <Grid container spacing={10} alignItems="center">
          <Grid container item xs={12} lg={6}>
            <Box component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              textAlign={{ xs: 'center', lg: 'left' }}
            >
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                display="inline-block"
                mb={3}
              >
                <Typography
                  component="span"
                  px={2}
                  py={1}
                  bgcolor="primary.light"
                  color="primary.main"
                  borderRadius="full"
                  fontSize="0.875rem"
                  fontWeight="medium"
                >
                  Full Stack Developer / Salesforce Developer
                </Typography>
              </Box>
              
              <Typography variant="h1" gutterBottom position="relative" display="inline-block">
                Vamshi Gutha
                <Box
                  position="absolute"
                  bottom={8}
                  left={0}
                  height={12}
                  width="100%"
                  bgcolor="primary.light"
                  sx={{ opacity: 0.2, zIndex: -1 }}
                />
              </Typography>
              
              <Typography variant="h4" color="text.secondary" gutterBottom>
                Passionate Developer & Problem Solver
              </Typography>
              
              <Typography variant="body1" color="text.secondary" maxWidth="600px" mx={{ xs: 'auto', lg: 0 }} mb={6}>
                I specialize in creating innovative solutions using cutting-edge technologies.
                With expertise in Salesforce, web development, and software engineering, I transform complex problems into elegant solutions.
              </Typography>
              
              <Box display="flex" gap={2} justifyContent={{ xs: 'center', lg: 'flex-start' }} mb={8}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get in Touch
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => window.open(resume, '_blank', 'noopener,noreferrer')}
                >
                  Download Resume
                </Button>
              </Box>
              
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                display="flex"
                alignItems="center"
                justifyContent={{ xs: 'center', lg: 'flex-start' }}
              >
                <Typography
                  variant="overline"
                  color="text.secondary"
                  mr={2}
                >
                  Connect
                </Typography>
                <Box bgcolor="divider" height={1} width={48} mr={2} />
                <Box display="flex" gap={2}>
                  <Button
                    onClick={() => window.open('https://github.com/guthaVamshi', '_blank', 'noopener,noreferrer')}
                    sx={{
                      minWidth: 'auto',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      p: 0,
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'common.white',
                      },
                    }}
                  >
                    <GitHubIcon />
                  </Button>
                  <Button
                    onClick={() => window.location.href = 'mailto:vamshigutha@gmail.com'}
                    sx={{
                      minWidth: 'auto',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      p: 0,
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'common.white',
                      },
                    }}
                  >
                    <EmailIcon />
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.linkedin.com/in/vamshigutha/', '_blank', 'noopener,noreferrer')}
                    sx={{
                      minWidth: 'auto',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      p: 0,
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'common.white',
                      },
                    }}
                  >
                    <LinkedInIcon />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid container item xs={12} lg={6} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              position="relative"
              height="600px"
            >
              {/* Tech elements */}
              <Box position="absolute" top={0} left={0} right={0} bottom={0}>
                {/* Main circular element */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  sx={{
                    transform: 'translate(-50%, -50%)',
                    width: 256,
                    height: 256,
                    borderRadius: '50%',
                    border: 4,
                    borderColor: 'primary.light',
                    animation: 'spin 15s linear infinite',
                  }}
                >
                  {/* Inner decorative nodes */}
                  {['top', 'bottom', 'left', 'right'].map((position) => (
                    <Box
                      key={position}
                      position="absolute"
                      sx={{
                        width: 16,
                        height: 16,
                        bgcolor: 'primary.main',
                        borderRadius: '50%',
                        ...(position === 'top' && {
                          top: 0,
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }),
                        ...(position === 'bottom' && {
                          bottom: 0,
                          left: '50%',
                          transform: 'translate(-50%, 50%)',
                        }),
                        ...(position === 'left' && {
                          left: 0,
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        }),
                        ...(position === 'right' && {
                          right: 0,
                          top: '50%',
                          transform: 'translate(50%, -50%)',
                        }),
                      }}
                    />
                  ))}
                </Box>
                
                {/* Secondary orbit */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  sx={{
                    transform: 'translate(-50%, -50%)',
                    width: 384,
                    height: 384,
                    borderRadius: '50%',
                    border: '2px dashed',
                    borderColor: 'primary.light',
                    opacity: 0.2,
                    animation: 'spin 20s linear infinite reverse',
                  }}
                >
                  {/* Tech icons */}
                  <Box
                    position="absolute"
                    top={0}
                    left="50%"
                    sx={{
                      transform: 'translate(-50%, -50%)',
                      width: 64,
                      height: 64,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 2,
                      animation: 'float 3s ease-in-out infinite',
                    }}
                  >
                    <Typography color="primary.main" fontSize={24}>⚛️</Typography>
                  </Box>
                  <Box
                    position="absolute"
                    bottom={0}
                    left="50%"
                    sx={{
                      transform: 'translate(-50%, 50%)',
                      width: 64,
                      height: 64,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 2,
                      animation: 'float 3s ease-in-out infinite',
                      animationDelay: '1s',
                    }}
                  >
                    <Typography fontSize={24}>☁️</Typography>
                  </Box>
                </Box>
                
                {/* Center element */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  sx={{
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    width: 112,
                    height: 112,
                    bgcolor: 'primary.main',
                    borderRadius: 4,
                    boxShadow: `0 0 20px rgba(108, 99, 255, 0.3)`,
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                >
                  <Box
                    position="absolute"
                    top={2}
                    left={2}
                    right={2}
                    bottom={2}
                    bgcolor="background.paper"
                    borderRadius={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ transform: 'rotate(-45deg)' }}
                  >
                    <Typography variant="h4" color="primary.main" fontWeight="bold">
                      VG
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </StyledContainer>

      <Box
        component={motion.div}
        position="absolute"
        bottom={32}
        left="50%"
        sx={{ transform: 'translateX(-50%)' }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          sx={{
            minWidth: 40,
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: 'background.paper',
            boxShadow: 2,
            '&:hover': {
              bgcolor: 'primary.main',
              color: 'common.white',
            },
          }}
        >
          <KeyboardArrowDownIcon />
        </Button>
      </Box>
    </Box>
  );
}
