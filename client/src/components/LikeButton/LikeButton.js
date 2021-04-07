import Icon from "components/Icon/Icon";
import styled from "styled-components";
import { bool, string, object } from "prop-types";
import { oneOf } from "prop-types";

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  border: 0;
  padding: 0.3em;
  background: transparent;

  svg {
    pointer-events: none;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

const ColorIcon = styled(Icon)`
  & > path {
    fill: ${({ color }) => (color ? color : "black")};
  }
`;

/* ---------------------------- styled components ---------------------------- */

export default function LikeButton({
  type = "button",
  label = "답변",
  isLiked,
  iconProps,
  ...restProps
}) {
  const displayLabel = `${label} ${!isLiked ? "좋아요" : "좋아요 해제"}`;
  return (
    <Button
      type={type}
      aria-label={displayLabel}
      title={displayLabel}
      {...restProps}
    >
      <ColorIcon
        color="red"
        type={isLiked ? "heart-active" : "heart"}
        {...iconProps}
      ></ColorIcon>
    </Button>
  );
}

/* -------------------------------- proptypes ------------------------------- */

LikeButton.propProps = {
  isLiked: bool,
  type: oneOf(["button", "submit"]),
  label: string,
  iconProps: object,
};
