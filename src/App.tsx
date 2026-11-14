import { CssBaseline, ThemeProvider } from '@mui/material';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useCallback, useMemo, useState } from 'react';
import { AppBackground } from '@/components/AppBackground';
import { SiteHeader } from '@/components/SiteHeader';
import { useAppearance } from '@/hooks/useAppearance';
import { useProfileVariant } from '@/hooks/useProfileVariant';
import { useThemeCssVars } from '@/hooks/useThemeCssVars';
import { AboutSection } from '@/sections/AboutSection';
import { AchievementsSection } from '@/sections/AchievementsSection';
import { ContactSection } from '@/sections/ContactSection';
import { EducationSection } from '@/sections/EducationSection';
import { ExperienceSection } from '@/sections/ExperienceSection';
import { HowIWorkSection } from '@/sections/HowIWorkSection';
import { HeroSection } from '@/sections/HeroSection';
import { LearningSection } from '@/sections/LearningSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { SiteFooter } from '@/sections/SiteFooter';
import { SkillsSection } from '@/sections/SkillsSection';
import { createAppTheme } from '@/theme/theme';
import type { PdfThemeInput } from '@/pdf/pdfTheme';
import type { ResumeData } from '@/types/resume';

async function downloadResumePdf(data: ResumeData, theme: PdfThemeInput) {
  const { downloadResumePdf: run } = await import('@/pdf/downloadResumePdf');
  await run(data, theme);
}

function App() {
  const { resume } = useProfileVariant();
  const {
    colorMode,
    toggleColorMode,
    accentId,
    setAccentId,
    customHex,
    setCustomHex,
    accent,
  } = useAppearance();
  const [pdfLoading, setPdfLoading] = useState(false);
  const [techFilter, setTechFilter] = useState<string | null>(null);

  const theme = useMemo(
    () => createAppTheme(colorMode, accent),
    [colorMode, accent],
  );
  useThemeCssVars(colorMode, accent);

  const handleDownloadPdf = useCallback(async () => {
    setPdfLoading(true);
    try {
      await downloadResumePdf(resume, { mode: colorMode, accent });
    } finally {
      setPdfLoading(false);
    }
  }, [resume, colorMode, accent]);

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBackground />
        <Helmet>
          <title>{resume.variant.seo.title}</title>
          <meta name="description" content={resume.variant.seo.description} />
          <meta
            name="theme-color"
            content={colorMode === 'light' ? '#f8fafc' : '#030712'}
          />
        </Helmet>

        <a href="#about" className="skip-link">
          Skip to content
        </a>

        <SiteHeader
          colorMode={colorMode}
          onToggleColorMode={toggleColorMode}
          onDownloadPdf={handleDownloadPdf}
          pdfLoading={pdfLoading}
          accentId={accentId}
          customHex={customHex}
          onSelectAccent={setAccentId}
          onCustomAccent={setCustomHex}
        />

        <main>
          <HeroSection
            data={resume}
            onDownloadPdf={handleDownloadPdf}
            pdfLoading={pdfLoading}
          />
          <AboutSection summary={resume.summary} />
          <HowIWorkSection principles={resume.workPrinciples} />
          <ExperienceSection experience={resume.experience} />
          <ProjectsSection
            projects={resume.projects}
            domainFilter={null}
            techFilter={techFilter}
            onClearFilters={() => setTechFilter(null)}
          />
          <SkillsSection
            skills={resume.skills}
            projects={resume.projects}
            activeTech={techFilter}
            onTechSelect={setTechFilter}
          />
          <AchievementsSection achievements={resume.achievements} />
          <EducationSection education={resume.education} />
          <LearningSection entries={resume.learning} />
          <ContactSection profile={resume.profile} />
        </main>

        <SiteFooter profile={resume.profile} tagline={resume.variant.tagline} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
