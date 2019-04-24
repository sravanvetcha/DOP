import { Component, ViewChild, OnInit } from '@angular/core';

import { connect } from 'http2';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Chart } from 'chart.js';
import { ReceiverService } from '../services/receiver.service';
export class DataSet{
  "data":number[]=[];
  "label":string='';
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ngOnInit() {
    this.render();
  }
  title = 'Angular Charts BBO app';
  websocketUrl="";
  constructor(private receiverService: ReceiverService) {
  }

  private messages =[];
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
  connect()
  {
    this.receiverService.connect(this.websocketUrl).subscribe(msg => {
      console.log("Response from websocket: " + msg);
     if(msg!="o") 
     {
      var splitMsg=msg.split("[\"");
      splitMsg=splitMsg[1].split("\"]")
      splitMsg=splitMsg[0].split("\\n\\n")
      splitMsg=splitMsg[1].split("\\u0000")
      console.log('message to parse is: ')
      var str_esc=escape("\""+splitMsg[0].toString()+"\"");
      str_esc=unescape(str_esc)
      var json=JSON.parse(str_esc)
      console.log('json ')
      console.log(JSON.parse(json))
      this.messages.push(json)
      this.pushDataIntoVariables(json)
     }
      
    });
  }
  pushDataIntoVariables(data)
  {
    data=JSON.parse(data)
    this.eventData=data;
    console.log('pushing into data variables'+data.providerBBOMap)
    if(data && data.providerBBOMap)
    {
      
      console.log('received provider map' )
      // Object.keys(data.providerBBOMap).map(r=>
      //   {
      //     if(!this.chartLabels.includes(r.toUpperCase()))
      //     {
      //       //this.chartLabels.push(r.toUpperCase())
      //     }
          
      //   });

        
        for (var i = 0; i < this.chartLabels.length; i++) { 
          var elementname=this.chartLabels[i];
          if(elementname=="BINANCE")
          {
            var element=data.providerBBOMap[elementname]
              if(this.BINANCE.length<this.yaxisVal)
              {
                this.BINANCE.push(element.askLevel.price);  
                this.BINANCE_BIDLEVEL.push(element.bidLevel.price); 
              }
              else{

                this.BINANCE.shift();
                this.BINANCE.push(element.askLevel.price);
                this.BINANCE_BIDLEVEL.shift();
                this.BINANCE_BIDLEVEL.push(element.bidLevel.price); 
              }
          }
          if(elementname=="BITREX")
          {
            var element=data.providerBBOMap[elementname]
              if(this.BITREX.length<this.yaxisVal)
              {
                this.BITREX.push(element.askLevel.price);  
                this.BITREX_BIDLEVEL.push(element.bidLevel.price); 
              }
              else{

                this.BITREX.shift();
                this.BITREX.push(element.askLevel.price);
                this.BITREX_BIDLEVEL.shift();
                this.BITREX_BIDLEVEL.push(element.bidLevel.price); 
              }
          }
          if(elementname=="E55")
          {
            var element=data.providerBBOMap[elementname]
              if(this.E55.length<this.yaxisVal)
              {
                this.E55.push(element.askLevel.price); 
                this.E55_BIDLEVEL.push(element.bidLevel.price); 
              }
              else{
                this.E55.shift();
                this.E55.push(element.askLevel.price);
                this.E55_BIDLEVEL.shift();
                this.E55_BIDLEVEL.push(element.bidLevel.price); 
              }
          }
          if(elementname=="HUOBI")
          {
            var element=data.providerBBOMap[elementname]
              if(this.HUOBI.length<this.yaxisVal)
              {
                this.HUOBI.push(element.askLevel.price); 
                this.HUOBI_BIDLEVEL.push(element.bidLevel.price);
              }
              else{
                //this.render()
               // this.HUOBI=[];
                this.HUOBI.shift();
                this.HUOBI.push(element.askLevel.price);
                this.HUOBI_BIDLEVEL.shift();
                this.HUOBI_BIDLEVEL.push(element.bidLevel.price);
              }
          }
         
            
        }
        console.log('all data arrays are:')
        console.log(this.BINANCE)     
        console.log(this.BITREX)  
        console.log(this.E55)   
        console.log(this.HUOBI)  
        var date = new Date();
       if(this.lineChartLabels.length<this.yaxisVal)
       {
          this.lineChartLabels.push("'"+date+"'")
          //this.render()  
       }
       else{
         this.lineChartLabels.shift();
         this.lineChartLabels.push("'"+date+"'")
       }
       //call to update the chart since data is populated
       if(this.startUpdating)
       {
        this.updateGraph()
        this.startUpdating=false; // this if wil run first time after that recursion in timeout will de done
       }
    } 
    else
    {

    }
  }


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
    setTimeout(() => {
    //this.render();
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
 // post event
 this.receiverService.postEventToSpring(this.eventData).subscribe(res => {
  //console.log(res)
 }, (err) => {
   console.log(err);
 });
    this.updateGraph();
   
    }, this.timerInterval*1000);
 }

}
