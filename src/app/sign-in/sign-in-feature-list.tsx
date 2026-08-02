import { ShieldCheck, Zap, GitPullRequest } from "lucide-react";

export function SignInFeatureList() {
  const features = [
    {
      icon: ShieldCheck,
      text: "Security & architecture reviewed",
    },
    {
      icon: Zap,
      text: "AI runs in parallel, results in seconds",
    },
    {
      icon: GitPullRequest,
      text: "Posts structured comments to your PR",
    },
  ];

  return (
    <ul className="mt-8 flex w-full flex-col gap-4 border-t border-border/50 pt-8 text-sm">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-center gap-3 text-muted-foreground">
          <feature.icon className="h-5 w-5 text-primary" />
          <span>{feature.text}</span>
        </li>
      ))}
    </ul>
  );
}
