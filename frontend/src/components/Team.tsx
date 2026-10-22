import { Code, Brain, Shield, CheckCheck } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  focus: string;
  icon: typeof Brain;
  gradient: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Anshi Verma",
    role: "AI / Agent Workflow & Pitch lead",
    focus: "Prompt engineering, agentic workflow orchestration, and pitch presentation.",
    icon: Brain,
    gradient: "from-[#60A5FA] to-[#A78BFA]",
  },
  {
    name: "Aditya Kumar",
    role: "Frontend / UI Developer",
    focus: "Responsive UI/UX architecture, design systems, and incident response interactions.",
    icon: Code,
    gradient: "from-[#22D3EE] to-[#60A5FA]",
  },
  {
    name: "Shourya Srivastava",
    role: "Backend / Security Developer",
    focus: "FastAPI server, threat signal extraction pipeline, and cybercrime API integrations.",
    icon: Shield,
    gradient: "from-[#FBBF24] to-[#FB923C]",
  },
  {
    name: "Devanshi Singh",
    role: "Research / QA",
    focus: "Phishing attack taxonomy, test case validation, and Indian cyber law compliance.",
    icon: CheckCheck,
    gradient: "from-[#FB7185] to-[#A78BFA]",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-16 sm:py-24 border-t border-[rgba(96,165,250,0.15)] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141B3D] border border-[rgba(96,165,250,0.3)] text-xs font-semibold text-[#22D3EE] mb-3 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            HackIndia x KIT AI & CyberTech Hackathon 2026
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet Team Build Beyond
          </h2>
          <p className="mt-3 text-base text-[#CBD5E1]">
            A collaborative team combining AI agent workflows, modern frontend engineering, security architecture, and cyber defense research.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => {
            const Icon = member.icon;
            const initials = member.name
              .split(" ")
              .map((n) => n[0])
              .join("");

            return (
              <div
                key={member.name}
                className="group rounded-2xl bg-[#141B3D] border border-[rgba(96,165,250,0.25)] p-6 flex flex-col items-center text-center hover:border-[#22D3EE] hover:bg-[#1A2350] hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Avatar Badge */}
                <div className="relative mb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${member.gradient} p-0.5 shadow-lg flex items-center justify-center`}
                  >
                    <div className="w-full h-full bg-[#0B1230] rounded-2xl flex items-center justify-center">
                      <span className="font-extrabold text-base tracking-wider text-white">
                        {initials}
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#141B3D] border border-[rgba(96,165,250,0.3)] text-[#22D3EE]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-white group-hover:text-[#22D3EE] transition-colors">
                  {member.name}
                </h3>

                {/* Role */}
                <div className="mt-1 px-2.5 py-1 rounded-md bg-[#0B1230] border border-[rgba(96,165,250,0.2)] text-xs font-semibold text-[#60A5FA]">
                  {member.role}
                </div>

                {/* Focus / Contribution */}
                <p className="mt-3 text-xs text-[#CBD5E1] leading-relaxed font-sans">
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
