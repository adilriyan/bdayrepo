export type SceneIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface OpenWhenNote {
  title: string
  icon: string
  msg: string
}

export interface Ripple {
  id: number
  x: number
  y: number
}

export interface StoryContentConfig {
  recipientName: string
  welcomeKicker: string
  welcomeHeadline: string
  welcomeBody: string
  welcomeButton: string
  welcomeMicrocopy: string
  
  letterTop: string
  letterSalutation: string
  letterMessage: string
  letterSign: string
  
  openWhenNotes: OpenWhenNote[]
  
  finaleLetterParagraphs: string[]
  secretFinalMessage: string
}

