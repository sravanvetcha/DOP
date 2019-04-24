import { Component, ViewChild, OnInit } from '@angular/core';
import { ReceiverService } from './services/receiver.service';
import { connect } from 'http2';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
   
  }
  

}
