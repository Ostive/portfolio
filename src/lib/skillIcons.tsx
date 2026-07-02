import { IconType } from 'react-icons';
import {
  SiPython, SiCplusplus, SiC, SiJavascript, SiTypescript, SiReact, SiPhp,
  SiNextdotjs, SiLaravel, SiHtml5, SiTailwindcss,
  SiMysql, SiApachehive, SiApachehadoop, SiPostgresql,
  SiDocker, SiNginx, SiGit, SiTrello,
} from 'react-icons/si';
import {
  Hash, AppWindow, Database, Workflow, Webhook, GanttChartSquare,
  Users, Puzzle, ListChecks, MessagesSquare, LucideIcon,
} from 'lucide-react';

interface SkillIconDef {
  icon: IconType | LucideIcon;
  color: string;
}

export const skillIcons: Record<string, SkillIconDef> = {
  'C++': { icon: SiCplusplus, color: '#00599C' },
  'C#': { icon: Hash, color: '#9B4F96' },
  'C': { icon: SiC, color: '#A8B9CC' },
  'Python': { icon: SiPython, color: '#3776AB' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'React': { icon: SiReact, color: '#61DAFB' },
  'PHP': { icon: SiPhp, color: '#777BB4' },
  'XAML': { icon: AppWindow, color: '#68217A' },

  'Next.js': { icon: SiNextdotjs, color: '#EDEDED' },
  'Laravel': { icon: SiLaravel, color: '#FF2D20' },
  'HTML/CSS': { icon: SiHtml5, color: '#E34F26' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },

  'MySQL': { icon: SiMysql, color: '#4479A1' },
  'SQL Server': { icon: Database, color: '#CC2927' },
  'Hive': { icon: SiApachehive, color: '#FDEE21' },
  'Hadoop': { icon: SiApachehadoop, color: '#66CCFF' },
  'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },

  'Docker': { icon: SiDocker, color: '#2496ED' },
  'Docker Swarm': { icon: SiDocker, color: '#2496ED' },
  'CI/CD': { icon: Workflow, color: '#3fb950' },
  'Nginx': { icon: SiNginx, color: '#009639' },
  'Git': { icon: SiGit, color: '#F05032' },

  'Trello': { icon: SiTrello, color: '#0052CC' },
  'Gantt': { icon: GanttChartSquare, color: '#e3b341' },
  'UML': { icon: Workflow, color: '#3fb950' },
  'REST API': { icon: Webhook, color: '#3fb950' },

  'Teamwork': { icon: Users, color: '#e3b341' },
  'Problem Solving': { icon: Puzzle, color: '#e3b341' },
  'Organization': { icon: ListChecks, color: '#e3b341' },
  'Communication': { icon: MessagesSquare, color: '#e3b341' },
};
