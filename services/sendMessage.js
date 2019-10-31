const { WebClient } = require('@slack/web-api');
require('dotenv').config();

const web = new WebClient(process.env.SLACK_TOKEN);

const makeBlocks = ({
  user,
  image,
  url,
  comment
}) => {
  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `${user} left some feedback on ${url}`
      }
    },
    {
      "type": "image",
      "title": {
        "type": "plain_text",
        "text": "Screenshot"
      },
      "image_url": image,
      "alt_text": "Screenshot"
    },
    {
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "*Comments:*"
				}
			]
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": comment
      },
      "accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Mark as Resolved",
					"emoji": true
				},
				"value": "resolved"
			}
		}
  ];
};

const sendMessage = async ({ channel, ...params }) => {
  const blocks = makeBlocks(params);
  const res = await web.chat.postMessage({
    channel,
    blocks
  });
};

module.exports = sendMessage;
