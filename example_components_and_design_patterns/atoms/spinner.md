# Spinner

## Summary

### Issue in implementation

* The example below, based on TenonUI's spinner, uses the SVG SMIL `animateTransform` element, which is not supported in internet explorer. See [support note on SMIL](./../../support_issues_and_bugs/svg/smil.md).

## My implementation

[My implementation based on TenonUI](./../../code_examples/2019Q4/1015TUI-Spinner/README.md) works well.

```tsx
import React from "react";
import { idGenerator } from "./../../utils/idGenerator";
import "./Spinner.css";

type Props = {
  title: string;
  replacementClassName?: string; // The CSS class to apply to the svg element
};

export const Spinner: React.FunctionComponent<Props> = ({
  title,
  replacementClassName,
  ...otherProps
}) => {
  const svgTitleId = idGenerator.generate();

  return (
    <>
      <svg
        role="img"
        viewBox="-1 -1 40 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby={title ? svgTitleId : null}
        className={replacementClassName || "Spinner"}
        {...otherProps}
      >
        {title && <title id={svgTitleId}>{title}</title>}

        <g stroke="currentColor" fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="3">
            <circle strokeOpacity=".2" cx="18" cy="18" r="18" />

            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    </>
  );
};

```