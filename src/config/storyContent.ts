import type { StoryContentConfig } from '../types/story.types'

const recipientName = (import.meta.env.VITE_RECIPIENT_NAME || 'Soumya').trim()

export const storyContent: StoryContentConfig = {
  recipientName,
  welcomeKicker: 'breaking news: someone is getting older!',
  welcomeHeadline: `Hey, ${recipientName}.\nGuess who deserves a little magic today?`,
  welcomeBody: 'I made you something. It contains questionable levels of cuteness, a few embarrassing thoughts, some smiles, and an unreasonable amount of affection. Basically, very you.',
  welcomeButton: 'Okay, show me!',
  welcomeMicrocopy: 'tap the teddy · birthday rules apply · no refunds on smiles',

  letterTop: 'A VERY IMPORTANT BIRTHDAY DOCUMENT',
  letterSalutation: `Dear ${recipientName},`,
  letterMessage: 'First of all, congratulations on surviving another year of being wonderfully weird.\n\nI hope you know how lovely you are, even though I suspect your brain is currently busy thinking about 47 completely unrelated things.\n\nLife is a little more fun with your kind of madness around. So today, forget the worries, eat something delicious, laugh a little louder, and enjoy being the main character.',
  letterSign: 'your favourite source of unnecessary nonsense ♡',

  openWhenNotes: [
  {
    title: 'when you need a hug',
    icon: '♡',
    msg: 'Sending you a virtual hug so big that even your problems will need a moment to recover. Imagine the warmest hug ever. Yes, that one. And no, you cannot escape before the extra squeeze.'
  },
  {
    title: 'when life gets dramatic',
    icon: '☁',
    msg: 'Madam, respectfully, life is not a daily soap opera. You do not have to solve every problem in one episode. Take a breath, get yourself a snack, and remember that even the strongest people deserve a little break.'
  },
  {
    title: 'when you need a laugh',
    icon: '☻',
    msg: 'Remember that you are a perfectly normal human being. Well... almost. Actually, forget I said that. Your level of weirdness deserves its own scientific research paper.'
  },
  {
    title: 'when you doubt yourself',
    icon: '✦',
    msg: 'Excuse me, have you forgotten who you are? You are talented, thoughtful, beautiful and ridiculously capable. Now stop underestimating yourself. The world already has enough people doing that.'
  },
  {
    title: 'when you miss someone',
    icon: '✉',
    msg: 'Some people are just one notification away from making a boring day better. So whenever you feel like talking, complaining, laughing or sharing absolutely nothing important, you know where to find me.'
  },
  {
    title: 'when you want to feel special',
    icon: '♡',
    msg: 'You are a little sunshine, a little chaos, and occasionally a walking headache. But somehow, all those things together make you wonderfully irreplaceable. And yes, that was a compliment. Do not get too proud.'
  }
],

  finaleLetterParagraphs: [
  `Happy birthday, ${recipientName}! ♡`,

  'May your days be filled with sunshine, your heart with happiness, and your life with little moments that turn into beautiful memories. May your dreams find their wings, your laughter never fade, and life surprise you with more love and joy than you ever imagined.',

  'Never lose that little spark that makes you who you are. Keep being a little silly, a little crazy, and wonderfully you. The world is brighter with your laughter in it, and I hope you always find a thousand reasons to smile.',

  'And of course, there are our two little penguins, waddling through life without a map or a plan, somehow figuring it all out together. Maybe that is what our bond is about: sharing silly moments, making memories, and finding happiness along the way, even when we do not know where we are going. ♡',

  'So here is to more laughter, unexpected adventures, countless happy moments, and a journey filled with little memories we will always treasure. Whenever life feels cloudy, I hope you find a little sunshine and remember how special you are.',

  `Happy birthday once again, ${recipientName}! Keep smiling, keep dreaming, and keep being your beautiful, wonderfully silly self. And wherever life takes us, may our two little penguins keep waddling along, making their own little world of happiness. ♡`
],

  secretFinalMessage: 'P.S. You are pretty awesome. Annoyingly awesome, actually. Never let the world convince you otherwise. Now go eat some cake. That is an order. ♡'
}

export const sceneNames = [
  'Welcome',
  'A letter',
  'A gift',
  'Memories',
  'Seaside journey',
  'Open when',
  'Make a wish',
  'For you'
] as const
