import { Code, Brain, Shield, CheckCheck } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface TeamMember {
  name: string;
  role: string;
  focus: string;
  imageSrc: string;
  icon: typeof Brain;
  accent: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Anshi Verma",
    role: "AI / Agent Workflow & Pitch lead",
    focus: "Prompt engineering, agentic workflow orchestration, and pitch presentation.",
    imageSrc: "/images/team-anshi.jpg",
    icon: Brain,
    accent: "#E11D48", // Coral / Rose
  },
  {
    name: "Aditya Kumar",
    role: "Frontend / UI Developer",
    focus: "Responsive 3D UI/UX architecture, design systems, and incident response interactions.",
    imageSrc: "/images/team-aditya.jpg",
    icon: Code,
    accent: "#2563EB", // Electric blue
  },
  {
    name: "Shourya Srivastava",
    role: "Backend / Security Developer",
    focus: "FastAPI server, threat signal extraction pipeline, and cybercrime API integrations.",
    imageSrc: "/images/team-shourya.jpg",
    icon: Shield,
    accent: "#F59E0B", // Amber
  },
  {
    name: "Devanshi Singh",
    role: "Research / QA",
    focus: "Phishing attack taxonomy, test case validation, and Indian cyber law compliance.",
    imageSrc: "/images/team-devanshi.jpg",
    icon: CheckCheck,
    accent: "#14B8A6", // Teal
  },
];

export default function Team() {
  const { isDark } = useTheme();

  return (
    <section
      id="team"
      className={`py-16 sm:py-24 border-t transition-colors scroll-mt-16 ${
        isDark ? "bg-[#0B1230] border-slate-800" : "bg-[#FFF9F0]/60 border-amber-900/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2563EB]/10 text-[#2563EB] mb-3">
            HackIndia x KIT AI & CyberTech Hackathon 2026
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Meet Team Build Beyond
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 font-sans">
            A specialized student team combining agent workflows, modern frontend engineering, backend security, and cyber defense research.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => {
            const Icon = member.icon;

            return (
              <div
                key={member.name}
                className={`group rounded-3xl border p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isDark
                    ? "bg-[#141B3D] border-slate-700"
                    : "bg-white border-amber-900/15 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                }`}
              >
                {/* Member Avatar / Image Slot */}
                <div className="relative mb-5">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-md">
                    <img
                      src={member.imageSrc}
                      alt={`Photo of ${member.name}, ${member.role}`}
                      width={400}
                      height={400}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div
                    className="absolute -bottom-2 -right-2 p-1.5 rounded-xl shadow-md text-white"
                    style={{ backgroundColor: member.accent }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#2563EB] transition-colors">
                  {member.name}
                </h3>

                {/* Role */}
                <div
                  className="mt-1 px-3 py-1 rounded-full text-xs font-bold border font-sans"
                  style={{
                    color: member.accent,
                    borderColor: `${member.accent}40`,
                    backgroundColor: `${member.accent}10`,
                  }}
                >
                  {member.role}
                </div>

                {/* Contribution details */}
                <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  {member.focus}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
