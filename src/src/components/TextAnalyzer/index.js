//https://backend-next-level-tutor.onrender.com/
import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Form, Layout, Row, Col, Modal } from 'antd';
import SchoolInfo from '../SchoolInfo';
import AnalysisResults from '../AnalysisResults';
import './TextAnalyzer.css';

const { Content } = Layout;
const { TextArea } = Input;

function TextAnalyzer() {
  const location = useLocation();
  const university = location.state?.university || 'No University Selected';
  const [prompt, setPrompt] = useState('');
  const [essayText, setEssayText] = useState('');
  const [wordCountLimit, setWordCountLimit] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false); // New state to toggle view
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility
  const [continueAnalysis, setContinueAnalysis] = useState(false); // To manage user response for exceeding word count

  // Handle resize observer loop error
  useEffect(() => {
    const handleResizeObserverError = () => {
      console.warn("ResizeObserver loop error suppressed.");
    };

    window.addEventListener('error', handleResizeObserverError);

    return () => {
      window.removeEventListener('error', handleResizeObserverError);
    };
  }, []);

  // Function to handle prompt and word count selection from the SchoolInfo modal
  const handleSelectPrompt = (selectedPrompt, wordCount) => {
    setPrompt(selectedPrompt);
    setWordCountLimit(wordCount);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    setContinueAnalysis(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setContinueAnalysis(false);
  };

  const handleSubmit = useCallback(async () => {
    const wordCount = essayText.trim().split(/\s+/).length;
    
    if (wordCountLimit && wordCount > wordCountLimit && !continueAnalysis) {
      setIsModalVisible(true); // Show modal if word count exceeds the limit
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://192.168.4.88:5000/analyze', { 
        prompt: prompt,
        essay: essayText 
      });
      console.log("In Submit", response.data);
      setAnalysis(response.data);
      
      setIsAnalyzed(true); // Switch to analysis view
    } catch (error) {
      console.error('Error analyzing text:', error);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, essayText, wordCountLimit, continueAnalysis]);

  useEffect(() => {
    if (continueAnalysis) {
      handleSubmit(); // Retry the submit if the user confirms to continue
    }
  }, [continueAnalysis, handleSubmit]);

  return (
    <Layout className="text-analyzer-container">
      <Content className={`content-layout ${isAnalyzed ? 'analyzed-view' : ''}`}>
        {!isAnalyzed &&
          <>
            {university !== 'No University Selected' && (
              <div className="left-section">
                <SchoolInfo university={university} onSelectPrompt={handleSelectPrompt} />
              </div>
            )}
          </>
        }

        <div className={`form-section ${isAnalyzed ? 'form-expanded' : ''}`}>
          <Form onFinish={handleSubmit} className="form-container">
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item>
                  <Input
                    placeholder="Enter Essay Prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    list="prompt-options"
                  />
                  <datalist id="prompt-options">
                    {/* Datalist for previous prompts */}
                  </datalist>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item>
                  <Input
                    type="number"
                    placeholder="Word Count Limit"
                    value={wordCountLimit || ''}
                    onChange={(e) => setWordCountLimit(Number(e.target.value))}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <TextArea
                rows={6}
                placeholder="Enter Essay Text"
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
              />
            </Form.Item>
            <div className='word-count'>
              {essayText ? essayText.trim().split(/\s+/).length : '0'} words
            </div>
            <div className="submit-button">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="submit-button"
              >
                Analyze
              </Button>
            </div>
          </Form>
        </div>

        {isAnalyzed && (
          <div className="right-section">
            <AnalysisResults analysis={analysis} />
          </div>
        )}

        {/* Modal for exceeding word count */}
        <Modal
          title="Word Count Exceeded"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText="Yes"
          cancelText="No"
        >
          <p>The word count exceeds the limit. Do you want to continue?</p>
        </Modal>
      </Content>
    </Layout>
  );
}

export default TextAnalyzer;

