import React from 'react';

interface SceneTypographyProps {
  children: React.ReactNode;
}

function SceneTitle({ children }: SceneTypographyProps) {
  return typeof children === 'string' ? (
    <h3 className="w-auto max-w-full truncate text-base font-bold tracking-tight text-foreground sm:text-lg">
      {children}
    </h3>
  ) : (
    <>{children}</>
  );
}

function SceneSubtitle({ children }: SceneTypographyProps) {
  return typeof children === 'string' ? (
    <h4 className="w-full truncate pl-px text-xs tracking-tight text-muted-foreground">
      {children}
    </h4>
  ) : (
    <>{children}</>
  );
}

function SceneDescription({ children }: SceneTypographyProps) {
  return typeof children === 'string' ? (
    <p className="w-full truncate text-sm tracking-tight text-muted-foreground">
      {children}
    </p>
  ) : (
    <>{children}</>
  );
}

const SceneTypography = Object.freeze({
  Title: SceneTitle,
  Subtitle: SceneSubtitle,
  Description: SceneDescription,
});

export { SceneTitle, SceneSubtitle, SceneDescription };

export default SceneTypography;
