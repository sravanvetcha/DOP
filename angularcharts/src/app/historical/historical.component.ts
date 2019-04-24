import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HistoryService } from '../services/history.service';
import { Label } from 'ng2-charts';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css']
})
export class HistoricalComponent implements OnInit {



  constructor(private fb: FormBuilder, private history:HistoryService) { }

  ngOnInit() {
    this.history.getTimeRange()
    .subscribe(res=>{
      console.log(res);
      res.forEach(e=>this.timeDuration.push(e.createdAt))
    });
    this.render();
  }
// variables
  formParams:any={  
    startTime:'',
    endTime:''
  };
  timeDuration = []
  
  buildHistoricalGraph()
  {
    console.log('time is')
    console.log(this.formParams)
 
    this.history.postTimeInterval(this.formParams)
    .subscribe(res=>{
      console.log(res);
      this.BINANCE=res.binance_ask;
      this.BINANCE_BIDLEVEL=res.binance_bid;

      this.BITREX= res.binance_ask;
      this.BITREX_BIDLEVEL=res.bitrex_bid;

      this.HUOBI=res.huobi_ask;
      this.HUOBI_BIDLEVEL=res.huobi_bid;

      this.E55=res.e55_ask;
      this.E55_BIDLEVEL=res.e55_bid;
      this.lineChartLabels=res.dates;
     // this.updateGraph();
     this.render()
    });
  }



  // all code for graphs 

  private chartLabels=['BINANCE','BITREX','E55','HUOBI'];
  private BINANCE=[];
  private E55=[];
  private BITREX=[];
  private HUOBI=[];
  private BINANCE_BIDLEVEL=[];
  private E55_BIDLEVEL=[];
  private BITREX_BIDLEVEL=[];
  private HUOBI_BIDLEVEL=[];
  yaxisVal=10;
  timerInterval=1;
  startUpdating=true;
  stepSizeYaxis=5000;
  @ViewChild('binancelineChart') private binancechartRef;
  @ViewChild('bitrexlineChart') private bitrexchartRef;
  @ViewChild('e55lineChart') private e55chartRef;
  @ViewChild('huobilineChart') private huobichartRef;
  // bid 
  @ViewChild('binancelineChart_bid') private binancechartRef_bid;
  @ViewChild('bitrexlineChart_bid') private bitrexchartRef_bid;
  @ViewChild('e55lineChart_bid') private e55chartRef_bid;
  @ViewChild('huobilineChart_bid') private huobichartRef_bid;
  private binancechart: any;
  private bitrexchart: any;
  private e55chart: any;
  private huobichart: any;
  private binancechart_bid: any;
  private bitrexchart_bid: any;
  private e55chart_bid: any;
  private huobichart_bid: any;
  private eventData:any;
   public lineChartData=[];
   public lineChartLabels: Label[] = [];




 //code related to charts 
 render()
 {
  this.binancechart = new Chart(this.binancechartRef.nativeElement, {
    type: 'line',
    data: {
      labels: this.lineChartLabels, // your labels array
      datasets: //this.lineChartData
      [
        {
          data:this.BINANCE, // BINANCE
          label: 'BINANCE',
          borderColor: '#00AEFF',
          fill: false
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true
          
        }],
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
            stepSize: this.stepSizeYaxis
          }
        }],
      }
    }
  });
//chart 2 
this.bitrexchart = new Chart(this.bitrexchartRef.nativeElement, {
  type: 'line',
  data: {
    labels: this.lineChartLabels, // your labels array
    datasets: //this.lineChartData
    [
      {
        data:this.BITREX, // BINANCE
        label: 'BITREX',
        borderColor: '#0CDEFF',
        fill: false
      }
    ]
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true
        
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          stepSize: this.stepSizeYaxis
        }
      }],
    }
  }
});
  
//chart 3 
this.e55chart = new Chart(this.e55chartRef.nativeElement, {
  type: 'line',
  data: {
    labels: this.lineChartLabels, // your labels array
    datasets: //this.lineChartData
    [
      {
        data:this.E55, // BINANCE
        label: 'E55',
        borderColor: '#B0AEFF',
        fill: false
      }
    ]
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true
        
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          stepSize: this.stepSizeYaxis
        }
      }],
    }
  }
});

//chart 4 
this.huobichart = new Chart(this.huobichartRef.nativeElement, {
  type: 'line',
  data: {
    labels: this.lineChartLabels, // your labels array
    datasets: //this.lineChartData
    [
      {
        data:this.HUOBI, // BINANCE
        label: 'HUOBI',
        borderColor: '#DEAEFF',
        fill: false
      }
    ]
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true
        
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          stepSize: this.stepSizeYaxis
        }
      }],
    }
  }
});

//chart 5 
this.binancechart_bid = new Chart(this.binancechartRef_bid.nativeElement, {
  type: 'line',
  data: {
    labels: this.lineChartLabels, // your labels array
    datasets: //this.lineChartData
    [
      {
        data:this.BINANCE_BIDLEVEL,
        label: 'BINANCE',
        borderColor: '#00AEFF',
        fill: false
      }
    ]
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true
        
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          stepSize: this.stepSizeYaxis
        }
      }],
    }
  }
});
//chart 6 
this.bitrexchart_bid = new Chart(this.bitrexchartRef_bid.nativeElement, {
  type: 'line',
  data: {
    labels: this.lineChartLabels, // your labels array
    datasets: //this.lineChartData
    [
      {
        data:this.BITREX_BIDLEVEL, // BINANCE
        label: 'BITREX',
        borderColor: '#BCDEFF',
        fill: false
      }
    ]
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true
        
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          stepSize: this.stepSizeYaxis
        }
      }],
    }
  }
});
//chart 7 
this.huobichart_bid = new Chart(this.huobichartRef_bid.nativeElement, {
  type: 'line',
  data: {
    labels: this.lineChartLabels, // your labels array
    datasets: //this.lineChartData
    [
      {
        data:this.HUOBI_BIDLEVEL, 
        label: 'HUOBI',
        borderColor: '#DEAEFF',
        fill: false
      }
    ]
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true
        
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          stepSize: this.stepSizeYaxis
        }
      }],
    }
  }
});
//chart 8 
this.e55chart_bid = new Chart(this.e55chartRef_bid.nativeElement, {
  type: 'line',
  data: {
    labels: this.lineChartLabels, // your labels array
    datasets: //this.lineChartData
    [
      {
        data:this.E55_BIDLEVEL, // BINANCE
        label: 'E55',
        borderColor: '#ABCEFF',
        fill: false
      }
    ]
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true
        
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          stepSize: this.stepSizeYaxis
        }
      }],
    }
  }
});
 }
   
 // update graph 
 updateGraph()
 {
    
    this.bitrexchart.update({
      duration: this.timerInterval*1000,
      easing: 'easeOutBounce'
  })
    this.binancechart.update({
      duration: this.timerInterval*1000,
      easing: 'easeOutBounce'
  })
    this.e55chart.update({
      duration: this.timerInterval*1000,
      easing: 'easeOutBounce'
  });
    this.huobichart.update({
      duration: this.timerInterval*1000,
      easing: 'easeOutBounce'
  });

  //bid level
  this.bitrexchart_bid.update({
    duration: this.timerInterval*1000,
    easing: 'easeOutBounce'
})
  this.binancechart_bid.update({
    duration: this.timerInterval*1000,
    easing: 'easeOutBounce'
})
  this.e55chart_bid.update({
    duration: this.timerInterval*1000,
    easing: 'easeOutBounce'
});
  this.huobichart_bid.update({
    duration: this.timerInterval*1000,
    easing: 'easeOutBounce'
});

}


}
