import {
  Defs,
  Document,
  LinearGradient,
  Link,
  Page,
  Rect,
  Stop,
  StyleSheet,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer';
import type { ResumeData } from '@/types/resume';
import { PDF_BODY_FONT, PDF_DISPLAY_FONT, registerPdfFonts } from './pdfFonts';
import { buildPdfPalette, type PdfPalette, type PdfThemeInput } from './pdfTheme';

registerPdfFonts();

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const BAR_HEIGHT = 6;

function createStyles(c: PdfPalette) {
  return StyleSheet.create({
    page: {
      paddingTop: 36,
      paddingBottom: 52,
      paddingHorizontal: 36,
      fontFamily: PDF_BODY_FONT,
      fontSize: 9,
      lineHeight: 1.45,
      color: c.body,
      backgroundColor: c.page,
    },
    name: {
      fontFamily: PDF_DISPLAY_FONT,
      fontWeight: 700,
      fontSize: 28,
      lineHeight: 1.1,
      color: c.heading,
    },
    role: { fontSize: 14, fontWeight: 700, color: c.heading, marginTop: 6 },
    tagline: { fontSize: 10.5, fontWeight: 600, color: c.accentText, marginTop: 2 },
    contactRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 9 },
    contactItem: { fontSize: 8.5, color: c.muted, marginRight: 14 },
    link: { color: c.accentText, textDecoration: 'none' },
    headline: { marginTop: 10, fontSize: 10, lineHeight: 1.55, color: c.body },

    metrics: { flexDirection: 'row', marginTop: 12 },
    metric: {
      flex: 1,
      paddingVertical: 7,
      paddingHorizontal: 9,
      marginRight: 8,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: c.accentBorder,
      backgroundColor: c.accentSoft,
    },
    metricValue: {
      fontFamily: PDF_DISPLAY_FONT,
      fontWeight: 700,
      fontSize: 14,
      color: c.accentText,
    },
    metricLabel: { fontSize: 7.5, fontWeight: 600, color: c.muted, marginTop: 1 },

    sectionHead: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 14,
      marginBottom: 7,
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    sectionDot: {
      width: 14,
      height: 3,
      borderRadius: 2,
      backgroundColor: c.a2,
      marginRight: 7,
    },
    sectionTitle: {
      fontFamily: PDF_DISPLAY_FONT,
      fontWeight: 600,
      fontSize: 9.5,
      textTransform: 'uppercase',
      color: c.accentText,
    },

    paragraph: { marginBottom: 5, fontSize: 9, lineHeight: 1.5 },
    firstParagraph: { color: c.heading, fontWeight: 500 },

    entryHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    entryTitle: { fontSize: 10.5, fontWeight: 700, color: c.heading, flex: 1 },
    blockTitle: { fontSize: 10.5, fontWeight: 700, color: c.heading },
    entryDate: { fontSize: 8.5, fontWeight: 600, color: c.muted, marginLeft: 8 },
    entrySub: { fontSize: 9, fontWeight: 600, color: c.accentText, marginTop: 1 },
    entryMeta: { fontSize: 8, color: c.muted, marginTop: 1, marginBottom: 4 },
    note: { fontSize: 8.5, fontWeight: 500, color: c.muted, marginBottom: 4 },

    bulletRow: { flexDirection: 'row', marginBottom: 2.5, paddingRight: 4 },
    bulletMark: { width: 10, color: c.a2, fontWeight: 700 },
    bulletText: { flex: 1 },

    entry: { marginBottom: 8 },

    chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 },
    chip: {
      fontSize: 7.5,
      fontWeight: 600,
      color: c.accentText,
      backgroundColor: c.accentSoft,
      borderWidth: 1,
      borderColor: c.accentBorder,
      borderRadius: 8,
      paddingVertical: 1.5,
      paddingHorizontal: 6,
      marginRight: 4,
      marginBottom: 3,
    },

    skillRow: { flexDirection: 'row', marginBottom: 2.5 },
    skillLabel: { width: 92, fontWeight: 700, color: c.heading, fontSize: 8.5 },
    skillNames: { flex: 1, fontSize: 8.5 },
    skillCore: { fontWeight: 700, color: c.accentText },

    footer: {
      position: 'absolute',
      // `bottom` is unreliable under page padding in react-pdf; anchor from the top instead.
      top: PAGE_HEIGHT - 40,
      left: 36,
      right: 36,
      textAlign: 'center',
      fontSize: 7.5,
      color: c.muted,
      borderTopWidth: 1,
      borderTopColor: c.border,
      paddingTop: 6,
    },
  });
}

type Styles = ReturnType<typeof createStyles>;

function SectionHeader({ title, s }: { title: string; s: Styles }) {
  return (
    <View style={s.sectionHead} wrap={false} minPresenceAhead={60}>
      <View style={s.sectionDot} />
      <Text style={s.sectionTitle}>{title}</Text>
    </View>
  );
}

function Bullet({ text, s }: { text: string; s: Styles }) {
  return (
    <View style={s.bulletRow} wrap={false}>
      <Text style={s.bulletMark}>•</Text>
      <Text style={s.bulletText}>{text}</Text>
    </View>
  );
}

interface Props {
  data: ResumeData;
  theme: PdfThemeInput;
}

export function ResumePdfDocument({ data, theme }: Props) {
  const c = buildPdfPalette(theme);
  const s = createStyles(c);
  const {
    profile,
    variant,
    summary,
    metrics,
    experience,
    projects,
    skills,
    achievements,
    education,
  } = data;

  const [role, ...detailParts] = variant.tagline.split('·').map((p) => p.trim());
  const detail = detailParts.join(' · ');

  return (
    <Document
      title={`${profile.fullName} — Resume`}
      author={profile.fullName}
      subject={variant.tagline}
      creator={profile.fullName}
      producer={profile.fullName}
      keywords="Technical Lead, Full-Stack, Vue.js, React, TypeScript, Node.js, AI-assisted engineering"
    >
      <Page size="A4" style={s.page}>
        <Svg
          fixed
          width={PAGE_WIDTH}
          height={BAR_HEIGHT}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <Defs>
            <LinearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor={c.a1} />
              <Stop offset="45%" stopColor={c.a2} />
              <Stop offset="100%" stopColor={c.a3} />
            </LinearGradient>
          </Defs>
          <Rect x={0} y={0} width={PAGE_WIDTH} height={BAR_HEIGHT} fill="url(#bar)" />
        </Svg>

        <View>
          <Text style={s.name}>{profile.fullName}</Text>
          <Text style={s.role}>{role}</Text>
          {detail ? <Text style={s.tagline}>{detail}</Text> : null}
          <View style={s.contactRow}>
            <Link src={`tel:${profile.phone.replace(/[^+\d]/g, '')}`} style={[s.contactItem, s.link]}>
              {profile.phone}
            </Link>
            <Link src={`mailto:${profile.email}`} style={[s.contactItem, s.link]}>
              {profile.email}
            </Link>
            <Text style={s.contactItem}>{profile.location}</Text>
          </View>
          <View style={[s.contactRow, { marginTop: 2 }]}>
            <Link src={profile.linkedIn.url} style={[s.contactItem, s.link]}>
              {profile.linkedIn.label}
            </Link>
            <Link src={profile.github.url} style={[s.contactItem, s.link]}>
              {profile.github.label}
            </Link>
          </View>
          {variant.heroHeadline ? <Text style={s.headline}>{variant.heroHeadline}</Text> : null}
        </View>

        <View style={s.metrics}>
          {metrics.map((m, i) => (
            <View
              key={m.label}
              style={[s.metric, i === metrics.length - 1 ? { marginRight: 0 } : {}]}
            >
              <Text style={s.metricValue}>{m.value}</Text>
              <Text style={s.metricLabel}>{m.label}</Text>
            </View>
          ))}
        </View>

        <SectionHeader title="Professional Summary" s={s} />
        {summary.paragraphs.map((p, i) => (
          <Text key={i} style={[s.paragraph, i === 0 ? s.firstParagraph : {}]}>
            {p}
          </Text>
        ))}

        <SectionHeader title="Work Experience" s={s} />
        {experience.map((job) => (
          <View key={job.id} style={s.entry}>
            <View wrap={false}>
              <View style={s.entryHead}>
                <Text style={s.entryTitle}>{job.role}</Text>
                <Text style={s.entryDate}>
                  {job.start} – {job.end}
                </Text>
              </View>
              <Text style={s.entrySub}>{job.organization}</Text>
              {job.location ? <Text style={s.entryMeta}>{job.location}</Text> : null}
              {job.note ? <Text style={s.note}>{job.note}</Text> : null}
              {job.highlights[0] ? <Bullet text={job.highlights[0]} s={s} /> : null}
            </View>
            {job.highlights.slice(1).map((h, i) => (
              <Bullet key={i} text={h} s={s} />
            ))}
          </View>
        ))}

        <SectionHeader title="Projects" s={s} />
        {projects.map((proj) => (
          <View key={proj.id} style={s.entry}>
            <View wrap={false}>
              <Text style={s.blockTitle}>{proj.title}</Text>
              {proj.subtitle ? <Text style={s.entrySub}>{proj.subtitle}</Text> : null}
              {proj.roleNote ? <Text style={s.entryMeta}>{proj.roleNote}</Text> : null}
              {proj.highlights[0] ? <Bullet text={proj.highlights[0]} s={s} /> : null}
            </View>
            {proj.highlights.slice(1).map((h, i) => (
              <Bullet key={i} text={h} s={s} />
            ))}
            {proj.featured ? (
              <View style={[s.chipRow, { marginTop: 3 }]} wrap={false}>
                {proj.techTags.map((t) => (
                  <Text key={t} style={s.chip}>
                    {t}
                  </Text>
                ))}
              </View>
            ) : null}
          </View>
        ))}

        <SectionHeader title="Technical Skills" s={s} />
        {skills.map((group) => (
          <View key={group.id} style={s.skillRow} wrap={false}>
            <Text style={s.skillLabel}>{group.label}</Text>
            <Text style={s.skillNames}>
              {group.skills.map((sk, i) => (
                <Text key={sk.name} style={sk.highlight ? s.skillCore : {}}>
                  {sk.name}
                  {i < group.skills.length - 1 ? '  ·  ' : ''}
                </Text>
              ))}
            </Text>
          </View>
        ))}

        <View wrap={false}>
          <SectionHeader title="Key Achievements" s={s} />
          {achievements.map((a) => (
            <View key={a.id} style={{ marginBottom: 4 }}>
              <Text style={{ fontWeight: 700, color: c.heading }}>{a.title}</Text>
              <Text style={{ fontSize: 8.5 }}>{a.description}</Text>
            </View>
          ))}
        </View>

        <View wrap={false}>
          <SectionHeader title="Education" s={s} />
          {education.map((edu) => (
            <View key={edu.degree} style={{ marginBottom: 6 }}>
              <Text style={s.blockTitle}>{edu.degree}</Text>
              <Text style={s.entryMeta}>
                {edu.institution} · {edu.period}
              </Text>
            </View>
          ))}
        </View>

        <Text
          fixed
          style={s.footer}
          render={({ pageNumber, totalPages }) =>
            `${profile.fullName} · ${role}   |   Page ${pageNumber} of ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}
