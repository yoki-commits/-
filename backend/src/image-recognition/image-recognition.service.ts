import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

@Injectable()
export class ImageRecognitionService {
  private uploadDir = path.join(__dirname, '..', '..', 'uploads');

  constructor() {
    // 创建上传目录
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async recognizeImage(filePath: string): Promise<{
    experimentName: string;
    principle: string;
    steps: string;
    notes: string;
    observations: string;
    instruments: string;
  }> {
    // 这里我们模拟大模型识别结果
    // 实际项目中，这里应该调用大模型的API进行图片识别
    const mockResults = {
      '酸碱中和滴定实验': {
        experimentName: '酸碱中和滴定实验',
        principle: '酸碱中和反应是指酸和碱相互作用生成盐和水的反应。在滴定过程中，当酸和碱恰好完全反应时，溶液的pH值会发生突变，此时即为滴定终点。',
        steps: '1. 准备滴定管和锥形瓶\n2. 用标准NaOH溶液润洗滴定管\n3. 向锥形瓶中加入一定体积的HCl溶液和酚酞指示剂\n4. 用NaOH溶液滴定HCl溶液，直到溶液变为粉红色且30秒内不褪色\n5. 记录消耗的NaOH溶液体积\n6. 重复实验2-3次，取平均值',
        notes: '1. 滴定管必须用标准溶液润洗，以避免浓度误差\n2. 滴定时要缓慢滴加，接近终点时要一滴一滴地加入\n3. 酚酞指示剂的变色范围是pH 8.2-10.0，适用于强碱滴定强酸\n4. 实验过程中要不断摇动锥形瓶，使溶液充分混合',
        observations: '1. 滴加NaOH溶液时，溶液会逐渐变为粉红色\n2. 接近终点时，粉红色会短暂出现后又消失\n3. 达到终点时，溶液变为稳定的粉红色\n4. 记录每次滴定消耗的NaOH溶液体积',
        instruments: '滴定管、锥形瓶、移液管、洗瓶、酚酞指示剂、标准NaOH溶液、HCl溶液'
      },
      '硫酸铜结晶水含量测定实验': {
        experimentName: '硫酸铜结晶水含量测定实验',
        principle: '硫酸铜晶体（CuSO4·5H2O）在加热时会失去结晶水，通过测量加热前后的质量变化，可以计算出硫酸铜结晶水的含量。',
        steps: '1. 称量空坩埚的质量\n2. 向坩埚中加入一定量的硫酸铜晶体，称量总质量\n3. 将坩埚放在酒精灯上加热，直到硫酸铜晶体完全变白\n4. 冷却后称量坩埚和无水硫酸铜的质量\n5. 重复加热、冷却、称量的操作，直到两次称量的质量差不超过0.001g\n6. 根据质量变化计算结晶水的含量',
        notes: '1. 加热时要不断搅拌，避免硫酸铜晶体局部过热\n2. 冷却时要在干燥器中进行，避免无水硫酸铜吸收空气中的水分\n3. 重复加热、冷却、称量的操作是为了确保结晶水完全失去\n4. 实验过程中要注意安全，避免烫伤',
        observations: '1. 加热时，硫酸铜晶体逐渐由蓝色变为白色\n2. 加热过程中会有水蒸气产生\n3. 冷却后，无水硫酸铜呈白色粉末状\n4. 记录加热前后的质量变化',
        instruments: '坩埚、天平、酒精灯、三脚架、石棉网、干燥器、玻璃棒'
      },
      '氢气的制取和性质实验': {
        experimentName: '氢气的制取和性质实验',
        principle: '锌与稀硫酸反应生成硫酸锌和氢气。氢气是一种无色、无味、易燃的气体，密度比空气小，难溶于水。',
        steps: '1. 组装实验装置，检查气密性\n2. 向试管中加入锌粒\n3. 加入稀硫酸，立即塞上带有导管的橡皮塞\n4. 收集氢气（排水法或向下排空气法）\n5. 检验氢气的纯度\n6. 进行氢气的燃烧实验\n7. 进行氢气与氧化铜的反应实验',
        notes: '1. 实验前要检查装置的气密性，避免氢气泄漏\n2. 收集氢气前要检验纯度，避免发生爆炸\n3. 氢气燃烧时要注意安全，避免火焰灼伤\n4. 实验结束后要及时关闭气体发生装置',
        observations: '1. 锌与稀硫酸反应时会产生大量气泡\n2. 氢气燃烧时产生淡蓝色火焰\n3. 氢气与氧化铜反应时，黑色的氧化铜会变为红色的铜\n4. 反应试管口会有水珠产生',
        instruments: '试管、导管、橡皮塞、水槽、酒精灯、锌粒、稀硫酸、氧化铜'
      }
    };

    // 模拟识别结果，实际项目中应该调用大模型API
    // 这里我们随机返回一个实验结果
    const experimentNames = Object.keys(mockResults);
    const randomIndex = Math.floor(Math.random() * experimentNames.length);
    const randomExperimentName = experimentNames[randomIndex];
    
    return mockResults[randomExperimentName];
  }

  async saveUploadedFile(file: any): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(this.uploadDir, fileName);
    
    fs.writeFileSync(filePath, file.buffer);
    
    return filePath;
  }

  async deleteFile(filePath: string): Promise<void> {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}