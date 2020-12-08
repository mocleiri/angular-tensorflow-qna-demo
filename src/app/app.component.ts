import {Component, OnInit} from '@angular/core';
import * as tf from '@tensorflow-models/qna';
import {Answer, ModelConfig, QuestionAndAnswer} from '@tensorflow-models/qna/dist/question_and_answer';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-tensorflow-qna-demo';
  public model: QuestionAndAnswer;

  public formGroup: FormGroup = new FormGroup({
    passage: new FormControl('Nikola Tesla (/ˈtɛslə/;[2] Serbo-Croatian: [nǐkola têsla]; Serbian Cyrillic: Никола Тесла;[a] 10\n' +
      '      July 1856 – 7 January 1943) was a Serbian-American[4][5][6] inventor, electrical engineer, mechanical engineer,\n' +
      '      and futurist who is best known for his contributions to the design of the modern alternating current (AC)\n' +
      '      electricity supply system.[7] <br/>\n' +
      '\n' +
      '      Born and raised in the Austrian Empire, Tesla studied engineering and physics in the 1870s without receiving a\n' +
      '      degree, and gained practical experience in the early 1880s working in telephony and at Continental Edison in the\n' +
      '      new electric power industry. He emigrated in 1884 to the United States, where he would become a naturalized\n' +
      '      citizen. He worked for a short time at the Edison Machine Works in New York City before he struck out on his own.\n' +
      '      With the help of partners to finance and market his ideas, Tesla set up laboratories and companies in New York to\n' +
      '      develop a range of electrical and mechanical devices. His alternating current (AC) induction motor and related\n' +
      '      polyphase AC patents, licensed by Westinghouse Electric in 1888, earned him a considerable amount of money and\n' +
      '      became the cornerstone of the polyphase system which that company would eventually market.<br/>\n' +
      '\n' +
      '      Attempting to develop inventions he could patent and market, Tesla conducted a range of experiments with\n' +
      '      mechanical oscillators/generators, electrical discharge tubes, and early X-ray imaging. He also built a\n' +
      '      wireless-controlled boat, one of the first ever exhibited. Tesla became well known as an inventor and would\n' +
      '      demonstrate his achievements to celebrities and wealthy patrons at his lab, and was noted for his showmanship at\n' +
      '      public lectures. Throughout the 1890s, Tesla pursued his ideas for wireless lighting and worldwide wireless\n' +
      '      electric power distribution in his high-voltage, high-frequency power experiments in New York and Colorado\n' +
      '      Springs. In 1893, he made pronouncements on the possibility of wireless communication with his devices. Tesla\n' +
      '      tried to put these ideas to practical use in his unfinished Wardenclyffe Tower project, an intercontinental\n' +
      '      wireless communication and power transmitter, but ran out of funding before he could complete it.[8]<br/>\n' +
      '\n' +
      '      After Wardenclyffe, Tesla experimented with a series of inventions in the 1910s and 1920s with varying degrees of\n' +
      '      success. Having spent most of his money, Tesla lived in a series of New York hotels, leaving behind unpaid bills.\n' +
      '      He died in New York City in January 1943.[9] Tesla\'s work fell into relative obscurity following his death, until\n' +
      '      1960, when the General Conference on Weights and Measures named the SI unit of magnetic flux density the tesla in\n' +
      '      his honor.[10] There has been a resurgence in popular interest in Tesla since the 1990s.[11]'),
    question: new FormControl('')
  });

  public answers: Answer[];

  public classify(): void {

    const question: string = this.formGroup.value.question;
    const context: string = this.formGroup.value.passage;

    this.model.findAnswers(question, context).then(x => {
      this.answers = x;

    });
  }

  ngOnInit(): void {

    const cfg: Config = new Config('assets/model/model.json');

    tf.load(cfg).then(x => {
      this.model = x;
    });
  }
}

class Config implements ModelConfig {
  fromTFHub: boolean;
  modelUrl: string;

  constructor(modelUrl: string) {
    this.modelUrl = modelUrl;
    this.fromTFHub = false;
  }
}
