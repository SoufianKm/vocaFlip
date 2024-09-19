import React from "react";
import { css, StyleSheet } from "aphrodite";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  PinterestShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  PinterestIcon,
  LinkedinIcon,
} from "react-share";

const ShareFlashcard = () => {
  const shareUrl = window.location.href;
  const shareMessage =
    "Share this flashcard with your friends and help spread the knowledge! Click the button below to share on your favorite social media platform.";

  return (
    <div className={css(styles.share_container)}>
      <p className={css(styles.share_text)}>
        Share this flashcard with your friends and help spread the knowledge!
        Click the button below to share on your favorite social media platform.
      </p>
      <div className={css(styles.share_buttons)}>
        <FacebookShareButton
          url={shareUrl}
          quote={shareMessage}
          hashtag="vocaFlip"
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={shareMessage}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} title={shareMessage}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <TelegramShareButton url={shareUrl} title={shareMessage}>
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
        <PinterestShareButton url={shareUrl}>
          <PinterestIcon size={32} round={true} />
        </PinterestShareButton>
        <LinkedinShareButton url={shareUrl} title={shareMessage}>
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

// Styles
const styles = StyleSheet.create({
  share_container: {
    margin: "30px 0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  share_text: {
    fontSize: "18px",
    fontWeight: "700",
  },
  share_buttons: {
    columnGap: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ShareFlashcard;
